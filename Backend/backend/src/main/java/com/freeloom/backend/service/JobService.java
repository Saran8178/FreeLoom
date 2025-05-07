package com.freeloom.backend.service;

import com.freeloom.backend.model.Job;
import com.freeloom.backend.model.User;
import com.freeloom.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job addJob(String title, String description, User postedBy) {
        Job job = new Job();
        job.setTitle(title);
        job.setDescription(description);
        job.setPostedBy(postedBy);
        job.setApproved(false);

        return jobRepository.save(job);
    }

    public List<Job> getApprovedJobs() {
        return jobRepository.findByIsApprovedTrue();
    }

    public List<Job> getJobsPendingApproval() {
        return jobRepository.findByIsApprovedFalse();
    }

    public void approveJob(Long jobId) {
        jobRepository.findById(jobId).ifPresent(job -> {
            job.setApproved(true);
            jobRepository.save(job);
        });
    }

    public List<Job> getJobsPostedBy(User recruiter) {
        return jobRepository.findByPostedBy(recruiter);
    }
}
