package com.freeloom.backend.service;

import com.freeloom.backend.model.User;
import com.freeloom.backend.model.Role;
import com.freeloom.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String name, String email, String password) {
        Role role = email.contains("client") ? Role.RECRUITER : Role.USER;

        String encryptedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(encryptedPassword);
        user.setRole(role);

        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User authenticateUser(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            } else {
                System.out.println("Password mismatch!");
            }
        }

        return null;
    }
}
