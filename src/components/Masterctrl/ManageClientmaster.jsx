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

const ManageClientmaster = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this with actual API call
    const sampleClients = [
      { id: 1, name: "Balasubramani", email: "bala@example.com", status: "Active" },
      { id: 2, name: "Srinivas Rao", email: "srinivas@example.com", status: "Pending" },
      { id: 3, name: "Priya Mehta", email: "priya@example.com", status: "Active" },
    ];
    setClients(sampleClients);
    setLoading(false);
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Client Management</h2>
          {loading ? (
            <p>Loading clients...</p>
          ) : (
            <table className="min-w-full bg-gray-100 text-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
             
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-t border-gray-300">
                    <td className="px-4 py-2 text-black">{client.id}</td>
                    <td className="px-4 py-2 text-black">{client.name}</td>
                    <td className="px-4 py-2 text-black">{client.email}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageClientmaster;