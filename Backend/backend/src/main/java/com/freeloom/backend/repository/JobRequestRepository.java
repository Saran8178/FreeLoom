package com.freeloom.backend.repository;

import com.freeloom.backend.model.JobRequest;
import com.freeloom.backend.model.RequestStatus;
import com.freeloom.backend.model.User;
import com.freeloom.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRequestRepository extends JpaRepository<JobRequest, Long> {

    List<JobRequest> findByUser(User user);

    List<JobRequest> findByJob(Job job);

    List<JobRequest> findByStatus(RequestStatus status);

    Optional<JobRequest> findByUserAndJob(User user, Job job); // prevent duplicates

}
