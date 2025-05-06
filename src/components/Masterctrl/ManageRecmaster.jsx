import React, { useEffect, useState } from "react";
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

const ManageRecmaster = () => {
  const [recruiters, setRecruiters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sampleRecruiters = [
      { id: 1, name: "Ravi Kumar", email: "ravi@example.com" },
      { id: 2, name: "Anita Sharma", email: "anita@example.com" },
      { id: 3, name: "John Doe", email: "john@example.com" },
    ];
    setRecruiters(sampleRecruiters);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex mt-8 gap-8">
        {/* Sidebar */}
        <div className="space-y-3 w-full md:w-1/5">
          <button
            onClick={() => navigate("/mastercontrols")}
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
          >
            <LayoutDashboard size={16} /> Dashboard
          </button>
          <button
            onClick={() => navigate("/mastercontrolclient")}
            className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
          >
            <Users size={16} /> Manage Clients
          </button>
          <button
            onClick={() => navigate("/mastercontrolrec")}
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
        <div className="flex-1 bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Recruiters</h1>
          <table className="w-full table-auto bg-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-left">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter.id} className="border-b border-gray-300">
                  <td className="p-3 text-black">{recruiter.id}</td>
                  <td className="p-3 text-black">{recruiter.name}</td>
                  <td className="p-3 text-black">{recruiter.email}</td>
                  <td className="p-3">
                    <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRecmaster;
