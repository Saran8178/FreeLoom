package com.freeloom.backend.controller;

import com.freeloom.backend.model.Job;
import com.freeloom.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class PublicJobController {

    @Autowired
    private JobService jobService;

    // PUBLIC endpoint to list all jobs
    @GetMapping("/all")
    public ResponseEntity<List<Job>> getAllApprovedJobs() {
        List<Job> jobs = jobService.getAllJobs(); // No filter, all jobs returned
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
public ResponseEntity<Job> getJobById(@PathVariable Long id) {
    Job job = jobService.getJobById(id);
    if (job != null) {
        return ResponseEntity.ok(job);
    } else {
        return ResponseEntity.notFound().build();
    }
}

}
