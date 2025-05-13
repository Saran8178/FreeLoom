import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Bookmark, Users, LogOut } from "lucide-react";

const JobBoard = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [jobData, setJobData] = useState([]);

  // Empty dependency array to run only once when component mounts
  useEffect(() => {
    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/jobs/all", {
                headers: {} // No authorization header for the public endpoint
            });
            setJobData(response.data); // Set job data in state
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    fetchJobs();
  }, []);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); // Redirect to homepage after logout
  };

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
            onClick={() => navigate("/userdashboard")} // Navigate to /userdashboard
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
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

          {/* Logout Button */}
          <button
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
            onClick={handleLogout} // Call handleLogout on click
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Available Jobs</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {jobData.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {job.company} • {job.location}
                </p>
                <p className="text-gray-700 mt-4 text-sm">{job.description}</p>
                {job.client && (
                  <p className="text-sm text-gray-600 mt-4">
                    <strong>Client:</strong> {job.client}
                  </p>
                )}
                <div className="mt-6">
                  <button
                    onClick={() => navigate(`/jobdetails/${job.id}`)}
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
