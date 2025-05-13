package com.freeloom.backend.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

public class AuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil; // Assuming JwtUtil handles the token parsing

    public AuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

   @Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                FilterChain filterChain) throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");

    // Skip authorization for public routes like /jobs/** (public job details route)
    if (request.getRequestURI().startsWith("/jobs/")) {
        filterChain.doFilter(request, response); // Proceed to the next filter without authentication
        return;
    }

    // Log the incoming authorization header for debugging
    System.out.println("Authorization Header: " + authHeader);

    // Check if the Authorization header is present and starts with "Bearer "
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        String token = authHeader.substring(7); // Get the token from the header
        try {
            // Extract claims from the JWT token
            Claims claims = jwtUtil.extractClaims(token);

            // Extract the role from the claims
            String role = claims.get("role", String.class);
            String email = claims.getSubject(); // Extract the email (or username)

            // Log role and email for debugging
            System.out.println("Extracted Role: " + role);
            System.out.println("Extracted Email: " + email);

            // Create authorities for Spring Security (with "ROLE_" prefix for the role)
            Authentication auth = new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))
            );

            // Set the authentication in the SecurityContext
            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (Exception e) {
            // If the token is invalid or expired, send a 401 Unauthorized response
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired JWT token");
            return;
        }
    }

    // Proceed with the filter chain (next filters in the chain)
    filterChain.doFilter(request, response);
}
}