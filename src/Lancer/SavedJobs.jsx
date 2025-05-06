import React from "react";
import { useSavedJobs } from './SavedJobsContext'; // Access saved jobs context

const SavedJobs = () => {
  const { savedJobs, removeJob } = useSavedJobs(); // Access context for saved jobs

  if (savedJobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">No saved jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Saved Jobs</h1>

        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
              <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
              <p className="text-gray-700 text-base">{job.description}</p>

              <button
                onClick={() => removeJob(job.id)} // Remove job from saved list
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4"
              >
                Remove from Saved Jobs
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
