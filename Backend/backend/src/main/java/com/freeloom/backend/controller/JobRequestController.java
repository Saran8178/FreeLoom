package com.freeloom.backend.controller;

import com.freeloom.backend.dto.CreateJobRequestDTO;
import com.freeloom.backend.model.Job;
import com.freeloom.backend.model.JobRequest;
import com.freeloom.backend.model.User;
import com.freeloom.backend.repository.JobRepository;
import com.freeloom.backend.repository.UserRepository;
import com.freeloom.backend.service.JobRequestService;

import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/job-requests")
public class JobRequestController {

    @Autowired
    private JobRequestService jobRequestService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

   @PostMapping
public ResponseEntity<?> createJobRequest(@RequestBody CreateJobRequestDTO dto, Authentication authentication) {
    String email = authentication.getName();
    Optional<User> userOpt = userRepository.findByEmail(email);
    Optional<Job> jobOpt = jobRepository.findById(dto.getJobId());

    if (userOpt.isEmpty() || jobOpt.isEmpty()) {
        return ResponseEntity.badRequest().body("Invalid user or job ID.");
    }

    JobRequest request = jobRequestService.requestJob(userOpt.get(), jobOpt.get());
    return ResponseEntity.ok(request);
}

}
