import React, { createContext, useState, useContext } from 'react';

// Create the SavedJobs context
const SavedJobsContext = createContext();

// Provider component for managing saved jobs
export const SavedJobsProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState([]);

  // Toggle saving or removing a job from saved jobs
  const toggleSaveJob = (job) => {
    setSavedJobs((prevJobs) => {
      // Check if the job is already in saved jobs
      const isAlreadySaved = prevJobs.some((savedJob) => savedJob.id === job.id);

      if (isAlreadySaved) {
        // If the job is already saved, remove it
        return prevJobs.filter((savedJob) => savedJob.id !== job.id);
      } else {
        // If the job is not saved, add it
        return [...prevJobs, job];
      }
    });
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, toggleSaveJob }}>
      {children}
    </SavedJobsContext.Provider>
  );
};

// Custom hook to use SavedJobsContext
export const useSavedJobs = () => useContext(SavedJobsContext);
