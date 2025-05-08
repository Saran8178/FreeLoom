import React, { useEffect, useState } from "react";
import {
  BarChart2,
  Users,
  FileText,
  DollarSign,
  Layers,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminBeta from "../Client/Adminbeta"; // Ensure the path is correct

export default function Adminusers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBeta, setShowBeta] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
console.log("Token from localStorage:", token); // Log the token

fetch("http://localhost:8080/api/recruiter/users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  })
  .then((data) => {
    setUsers(data);
    setLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
    setLoading(false);
  });
 
  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 shadow-md p-4">
        <div className="text-2xl font-bold mb-6 text-black">AdminPanel</div>
        <nav className="space-y-2">
          <SidebarItem
            icon={<BarChart2 size={18} />}
            label="Dashboard"
            onClick={() => navigate("/admindashboard")}
          />
          <SidebarItem
            icon={<Users size={18} />}
            label="Users"
            onClick={() => navigate("/adminusers")}
          />
          <SidebarItem
            icon={<FileText size={18} />}
            label="Manage Request"
            onClick={() => navigate("/adminmanagerequest")}
          />
          <SidebarItem icon={<DollarSign size={18} />} label="Payments" />
          <SidebarItem
            icon={<Layers size={18} />}
            label="Manage Jobs"
            onClick={() => navigate("/adminjobs")}
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            onClick={() => navigate("/adminsettings")}
          />
          <SidebarItem icon={<LogOut size={18} />} label="Logout" />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Manage Users</h1>
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-100 rounded shadow">
              <thead>
                <tr className="bg-slate-200 text-left">
                  <th className="py-3 px-4 text-gray-700">ID</th>
                  <th className="py-3 px-4 text-gray-700">Name</th>
                  <th className="py-3 px-4 text-gray-700">Email</th>
                  <th className="py-3 px-4 text-gray-700">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-slate-300 hover:bg-slate-50">
                    <td className="py-2 px-4 text-gray-600">{user.id}</td>
                    <td className="py-2 px-4 text-gray-600">{user.name}</td>
                    <td className="py-2 px-4 text-gray-600">{user.email}</td>
                    <td className="py-2 px-4 text-gray-600">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No users found.</p>
        )}
      </main>

      {/* AdminBeta Popup */}
      {showBeta && <AdminBeta onClose={() => setShowBeta(false)} />}
    </div>
  );
}

function SidebarItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 bg-white text-black rounded hover:bg-gray-300 text-left shadow-sm"
    >
      {icon} <span>{label}</span>
    </button>
  );
}
