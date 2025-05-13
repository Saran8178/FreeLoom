import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useSavedJobs } from './SavedJobsContext';
import axios from 'axios';
import { User, Bookmark, Users, LogOut } from 'lucide-react';

const Jobdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedJobs, toggleSaveJob } = useSavedJobs();

  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");
      console.log("Token found:", token);

      if (!token) {
        console.error("No token found!");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    if (job && savedJobs.find((savedJob) => savedJob.id === job.id)) {
      setIsSaved(true);
    }
  }, [savedJobs, job]);

  const handleSaveJob = () => {
    toggleSaveJob(job);
    setIsSaved(!isSaved);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* Top navigation bar */}
      <nav className="flex justify-center gap-6 py-4 text-sm text-gray-700 border-b border-gray-200 overflow-x-auto">
        <span>Graphics & Design</span>
        <span>Programming & Tech</span>
        <span>Digital Marketing</span>
        <span>Video & Animation</span>
        <span>Writing & Translation</span>
        <span>Music & Audio</span>
        <span>Business</span>
        <span>Finance</span>
        <span>AI Services</span>
      </nav>

      {/* Sidebar + Content layout */}
      <div className="flex gap-8 mt-8 max-w-7xl mx-auto px-4">
        {/* Sidebar */}
        <div className="space-y-3 w-full md:w-1/4">
          <button
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
            onClick={() => navigate("/userdashboard")}
          >
            <LogOut size={16} /> Dashboard
          </button>
          <button className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2">
            <User size={16} /> User Profile
          </button>
          <button
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
            onClick={() => navigate("/savedjob")}
          >
            <Bookmark size={16} /> Saved Jobs
          </button>
          <button
            onClick={() => navigate("/clientlist")}
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
          >
            <Users size={16} /> Manage Client
          </button>
          <button
            onClick={handleLogout}
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 bg-white p-8 rounded-2xl shadow relative">
          <button
            onClick={handleSaveJob}
            className={`absolute top-4 right-4 text-xl p-2 rounded-full ${
              isSaved
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-400 border-2 border-gray-300'
            } hover:bg-green-700 transition-all`}
          >
            <Heart />
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <p className="text-gray-600 text-sm mb-4">
            {job.company} • {job.location}
          </p>
          <p className="text-gray-700 text-base mb-4">{job.description}</p>

          {/* ✅ Send Request button added here */}
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mb-4"
          >
            Send Request
          </button>

          {job.client && (
            <p className="text-sm text-gray-600 mb-4">
              <strong>Client:</strong> {job.client}
            </p>
          )}

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobdetails;
