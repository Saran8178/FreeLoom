package com.freeloom.backend.controller;

import com.freeloom.backend.model.User;
import com.freeloom.backend.model.Role;
import com.freeloom.backend.service.UserService;
import com.freeloom.backend.dto.LoginRequest;
import com.freeloom.backend.dto.SignupRequest;
import com.freeloom.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow frontend access during dev
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider; // For JWT token generation

    // Signup API - Registers a new user
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest signupRequest) {
        User user = userService.registerUser(
                signupRequest.getName(),
                signupRequest.getEmail(),
                signupRequest.getPassword()
        );

        // You can send a success message or return user details
        return ResponseEntity.ok("User registered successfully");
    }

    // Login API - Authenticates the user and returns a JWT token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Validate credentials
        User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // Generate JWT token
        String token = tokenProvider.generateToken(user);

        // Return the JWT token to the user
        return ResponseEntity.ok("Bearer " + token); // Can return it as a JSON object as well
    }
}