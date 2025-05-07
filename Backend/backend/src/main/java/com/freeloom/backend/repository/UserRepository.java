package com.freeloom.backend.repository;

import com.freeloom.backend.model.User;
import com.freeloom.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email); // for login

    List<User> findByRole(Role role); // list all users or recruiters

    boolean existsByEmail(String email); // for validation

}
