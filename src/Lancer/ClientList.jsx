import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, User, Bookmark, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Add if not already used

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const sampleData = [
          { id: 1, name: "Balasubramani", status: "Active" },
          { id: 2, name: "Srinivas Rao", status: "Pending" },
          { id: 3, name: "Priya Mehta", status: "Active" },
        ];
        setClients(sampleData);
      } catch (err) {
        setError("Failed to load client data.");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading clients...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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

      <div className="flex mt-8 gap-8">
        {/* Sidebar */}
        <div className="space-y-3 w-full md:w-1/5">
        <button
  onClick={() => navigate("/userdashboard")}
  className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
>
  <ArrowRight size={16} /> Dashboard
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
          <button className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          {/* Client List */}
         

          {/* Client Request Status */}
          <div className="bg-white shadow p-6 rounded-xl">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Client Requests</h1>
            <ul className="space-y-3">
              {clients.map((client) => (
                <li key={client.id} className="flex justify-between text-gray-700 border-b pb-2">
                  <span>{client.name}</span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      client.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {client.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
