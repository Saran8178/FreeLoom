import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Bookmark,
  User,
  LogOut,
} from "lucide-react";

const OverallAdmin = () => {
  const navigate = useNavigate();
  const [clientCount, setClientCount] = useState(0);
  const [recruiterCount, setRecruiterCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    // Mocked metrics
    setClientCount(24);
    setRecruiterCount(15);
    setJobCount(132);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex mt-8 gap-8">
        {/* Sidebar */}
        <div className="space-y-3 w-full md:w-1/5">
          <button
            onClick={() => navigate("/userdashboard")}
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
          >
            <LayoutDashboard size={16} /> Dashboard
          </button>
          <button
            onClick={() => navigate("/clientlist")}
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
          >
            <Users size={16} /> Manage Clients
          </button>
          <button
            onClick={() => navigate("/recruiterlist")}
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
          >
            <Briefcase size={16} /> Manage Recruiters
          </button>
          <button
            onClick={() => navigate("/joblist")}
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
          >
            <FileText size={16} /> Job Postings
          </button>
         
          <button
            onClick={() => navigate("/userprofile")}
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
          >
            <User size={16} /> User Profile
          </button>
          <button className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard Summary</h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Total Clients</span>
                <span className="font-semibold">{clientCount}</span>
              </li>
              <li className="flex justify-between">
                <span>Total Recruiters</span>
                <span className="font-semibold">{recruiterCount}</span>
              </li>
              <li className="flex justify-between">
                <span>Total Jobs</span>
                <span className="font-semibold">{jobCount}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <p className="text-gray-600 text-sm">Recent updates from clients and recruiters will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallAdmin;
