package com.freeloom.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freeloom.backend.dto.UserDTO;
import com.freeloom.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/recruiter")

@CrossOrigin // Add this if you're calling from frontend on a different port
public class AdminusersController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        try {
            return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole().name()
                ))
                .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // or throw a custom exception
        }
    }
}