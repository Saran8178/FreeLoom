package com.freeloom.backend.repository;

import com.freeloom.backend.model.Job;
import com.freeloom.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByIsApprovedTrue(); // all approved jobs

    List<Job> findByPostedBy(User user); // jobs posted by a recruiter/admin

    List<Job> findByIsApprovedFalse(); // jobs pending approval

}
