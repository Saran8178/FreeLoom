import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart2,
  Users,
  FileText,
  DollarSign,
  Layers,
  Settings,
  LogOut,
} from 'lucide-react'; // Import necessary icons

const AdminSettings = () => {
  // Profile and Security State
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = () => {
    if (profile.newPassword === profile.confirmPassword) {
      // Logic to handle password change (e.g., call an API)
      alert('Password updated successfully');
    } else {
      alert('Passwords do not match');
    }
  };

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    siteTitle: 'Admin Panel',
    maintenanceMode: false,
    timeZone: 'UTC',
    language: 'English',
  });

  const handleSystemSettingsChange = (e) => {
    setSystemSettings({ ...systemSettings, [e.target.name]: e.target.value });
  };

  const handleToggleMaintenance = () => {
    setSystemSettings((prev) => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
  };

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  });

  const handleNotificationToggle = (e) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.checked,
    });
  };

  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="min-h-screen flex bg-gray-100 text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 shadow-md p-4">
        <div className="text-2xl font-bold mb-6">AdminPanel</div>
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
                     onClick={() => navigate("/adminjobs")} // Navigate to /adminjobs
                   />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
          <SidebarItem icon={<LogOut size={18} />} label="Logout" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6">Admin Settings</h1>

        {/* Profile & Security Settings */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile & Security</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <button
            onClick={handlePasswordChange}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-400"
          >
            Change Settings
          </button>
        </div>

        {/* System Settings */}
  

        {/* Notification Settings */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notificationSettings.emailNotifications}
              onChange={handleNotificationToggle}
              className="mr-2"
            />
            <label className="text-sm">Email Notifications</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="pushNotifications"
              checked={notificationSettings.pushNotifications}
              onChange={handleNotificationToggle}
              className="mr-2"
            />
            <label className="text-sm">Push Notifications</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={notificationSettings.smsNotifications}
              onChange={handleNotificationToggle}
              className="mr-2"
            />
            <label className="text-sm">SMS Notifications</label>
          </div>
        </div>
      </main>
    </div>
  );
};

function SidebarItem({ icon, label, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
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

export default AdminSettings;
