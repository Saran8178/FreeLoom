package com.freeloom.backend.service;

import com.freeloom.backend.model.Role;
import com.freeloom.backend.model.User;
import com.freeloom.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(String name, String email, String password) {
        Role role = email.contains("client") ? Role.RECRUITER : Role.USER;

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password); // You should hash this
        user.setRole(role);

        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    public void blockUser(Long userId) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setBlocked(true);
            userRepository.save(user);
        });
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
