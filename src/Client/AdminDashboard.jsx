import React, { useState } from "react";
import {
  Bell,
  User,
  Settings,
  LogOut,
  Users,
  DollarSign,
  BarChart2,
  FileText,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import AdminBeta from "../components/Client/Adminbeta";

const AdminDashboard = () => {
  const [showBeta, setShowBeta] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 shadow-md p-4">
        <div className="text-2xl font-bold mb-6">AdminPanel</div>
        <nav className="space-y-2">
          <SidebarItem
            icon={<BarChart2 size={18} />}
            label="Dashboard"
            onClick={() => setShowBeta(true)}
          />
          <SidebarItem
            icon={<Users size={18} />}
            label="Users"
            onClick={() => navigate("/adminusers")} 
          />
          <SidebarItem
            icon={<FileText size={18} />}
            label="Manage Request"
            onClick={() => navigate("/adminmanagerequest")} // Updated to navigate to /adminmanagerequest
          />
          <SidebarItem icon={<DollarSign size={18} />} label="Payments" />
          <SidebarItem
            icon={<Layers size={18} />}
            label="Manage Jobs"
            onClick={() => navigate("/adminjobs")} // Navigate to /adminjobs
          />
               <SidebarItem
                  icon={<Settings size={18} />}
                  label="Settings"
                  onClick={() => navigate("/adminsettings")} // Navigate to admin settings
                />
          <SidebarItem icon={<LogOut size={18} />} label="Logout" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <Bell size={20} className="cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer">
              <User size={20} />
              <span>Admin</span>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <Widget
            title="Total Users"
            value="2,430"
            customClass="text-green-600 text-xl font-bold" // Added custom class
          />
          <Widget title="Monthly Revenue" value="$12,340" customClass="text-green-600 text-xl font-bold"/>
          <Widget title="Reports" value="34" customClass="text-green-600 text-xl font-bold"/>
          <Widget title="Projects" value="128" customClass="text-green-600 text-xl font-bold"/>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-700 mb-2">User JohnDoe created a new project.</p>
            <p className="text-gray-700 mb-2">JaneSmith submitted a withdrawal request.</p>
            <p className="text-gray-700">Flagged content reviewed by Admin2.</p>
          </div>
        </section>
      </main>

      {/* Modal */}
      {showBeta && <AdminBeta onClose={() => setShowBeta(false)} />}
    </div>
  );
};

function SidebarItem({ icon, label, to, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      window.location.href = to;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 px-4 py-2 bg-white rounded hover:bg-gray-300 text-left shadow-sm"
    >
      {icon} <span>{label}</span>
    </button>
  );
}

function Widget({ title, value, customClass }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className={`text-sm font-medium text-gray-600 ${customClass || ''}`}>{title}</h3>
      <p className="text-xl font-semibold mt-2">{value}</p>
    </div>
  );
}

export default AdminDashboard;
