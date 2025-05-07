package com.freeloom.backend.service;

import com.freeloom.backend.model.Job;
import com.freeloom.backend.model.JobRequest;
import com.freeloom.backend.model.RequestStatus;
import com.freeloom.backend.model.User;
import com.freeloom.backend.repository.JobRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobRequestService {

    @Autowired
    private JobRequestRepository jobRequestRepository;

    public JobRequest requestJob(User user, Job job) {
        Optional<JobRequest> existingRequest = jobRequestRepository.findByUserAndJob(user, job);

        if (existingRequest.isPresent()) {
            return existingRequest.get();
        }

        JobRequest request = new JobRequest();
        request.setUser(user);
        request.setJob(job);
        request.setStatus(RequestStatus.PENDING);

        return jobRequestRepository.save(request);
    }

    public void approveRequest(Long requestId) {
        jobRequestRepository.findById(requestId).ifPresent(request -> {
            request.setStatus(RequestStatus.APPROVED);
            jobRequestRepository.save(request);
        });
    }

    public void rejectRequest(Long requestId) {
        jobRequestRepository.findById(requestId).ifPresent(request -> {
            request.setStatus(RequestStatus.REJECTED);
            jobRequestRepository.save(request);
        });
    }

    public List<JobRequest> getRequestsByUser(User user) {
        return jobRequestRepository.findByUser(user);
    }

    public List<JobRequest> getRequestsByJob(Job job) {
        return jobRequestRepository.findByJob(job);
    }

    public List<JobRequest> getPendingRequests() {
        return jobRequestRepository.findByStatus(RequestStatus.PENDING);
    }
}
