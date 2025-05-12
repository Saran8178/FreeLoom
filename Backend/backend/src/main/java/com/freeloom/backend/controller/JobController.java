package com.freeloom.backend.controller;

import com.freeloom.backend.dto.JobRequestDTO;
import com.freeloom.backend.model.Job;
import com.freeloom.backend.model.User;
import com.freeloom.backend.repository.UserRepository;
import com.freeloom.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recruiter/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<Job> addJob(@RequestBody JobRequestDTO jobRequestDTO, Authentication authentication) {
String email = (String) authentication.getPrincipal();

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Recruiter not found with email: " + email));

        Job createdJob = jobService.addJob(
                jobRequestDTO.getTitle(),
                jobRequestDTO.getDescription(),
                jobRequestDTO.getClientName(),
                recruiter
        );
        return ResponseEntity.ok(createdJob);
    }
}
