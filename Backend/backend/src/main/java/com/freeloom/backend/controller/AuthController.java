package com.freeloom.backend.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.freeloom.backend.dto.LoginRequest;
import com.freeloom.backend.dto.SignupRequest;
import com.freeloom.backend.model.User;
import com.freeloom.backend.security.JwtUtil;
import com.freeloom.backend.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Signup API - Registers a new user
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignupRequest request) {
        User user = userService.registerUser(request.getName(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok(user);
    }

    // Login API - Authenticates the user and returns a JWT token + role
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userService.getUserByEmail(request.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (userService.authenticateUser(request.getEmail(), request.getPassword()) != null) {
                String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
                
                // Return both token and role in response
                return ResponseEntity.ok(Map.of(
                    "token", token,
                    "role", user.getRole().name()
                ));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
