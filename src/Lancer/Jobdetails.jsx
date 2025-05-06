import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useSavedJobs } from './SavedJobsContext'; // Import the custom hook

// Sample job data (replace with actual dynamic data)
const jobData = [
  { id: 1, title: 'Frontend Developer', company: 'TechNova Inc.', location: 'Remote', description: 'Build interactive UI components using React and Tailwind CSS.', client: 'Balasubramani' },
  { id: 2, title: 'Backend Engineer', company: 'CodeWorks', location: 'Bangalore, India', description: 'Design APIs and manage database logic with Node.js and MongoDB.', client: '' },
  { id: 3, title: 'UI/UX Designer', company: 'PixelCraft', location: 'New York, USA', description: 'Craft intuitive interfaces and user experiences for web apps.', client: '' },
];

const Jobdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobData.find((job) => job.id === parseInt(id));
  const { savedJobs, toggleSaveJob } = useSavedJobs(); // Use the context

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if the current job is already saved
    if (savedJobs.find((savedJob) => savedJob.id === job?.id)) {
      setIsSaved(true);
    }
  }, [savedJobs, job]);

  const handleSaveJob = () => {
    // Toggle the saved state of the job
    toggleSaveJob(job); // Update context

    // Update the heart color
    setIsSaved(!isSaved);
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex gap-8 mt-8 max-w-7xl mx-auto px-4">
        <div className="w-full md:w-3/4 bg-white p-8 rounded-2xl shadow relative">
          <button
            onClick={handleSaveJob}
            className={`absolute top-4 right-4 text-xl p-2 rounded-full ${isSaved ? 'bg-green-600 text-white' : 'bg-white text-gray-400 border-2 border-gray-300'} hover:bg-green-700 transition-all`}
          >
            <Heart />
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <p className="text-gray-600 text-sm mb-4">{job.company} • {job.location}</p>
          <p className="text-gray-700 text-base mb-4">{job.description}</p>
          {job.client && <p className="text-sm text-gray-600 mb-4"><strong>Client:</strong> {job.client}</p>}

          <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Back to Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Jobdetails;
