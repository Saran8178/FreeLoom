package com.freeloom.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);  // Symmetric key for signing and verification

    @Value("${app.jwt.expiration}")
    private long expirationMs;  // The expiration time, e.g., 3600000 for 1 hour

    // Method to generate a JWT token
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs)) // Set expiration time
                .signWith(key)  // Signing the JWT with the key
                .compact();
    }

    // Method to extract claims from the JWT token
    public Claims extractClaims(String token) throws ExpiredJwtException {
        return Jwts.parserBuilder()
                .setSigningKey(key)  // Verify with the same key used for signing
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Utility method to validate if the token is expired
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = extractClaims(token);
            Date expiration = claims.getExpiration();
            return expiration.before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }
}
