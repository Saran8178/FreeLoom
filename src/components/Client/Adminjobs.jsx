import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Users, FileText, DollarSign, Layers, Settings, LogOut } from 'lucide-react'; // Import necessary icons

const AdminJobs = () => {
  // State for form input fields
  const [jobForm, setJobForm] = useState({
    jobTitle: '',
    company: '',
    description: '',
    clientName: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobForm({
      ...jobForm,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add the job (for now, we log the job data to the console)
    console.log('Job Added:', jobForm);
    // Reset the form after submission
    setJobForm({
      jobTitle: '',
      company: '',
      description: '',
      clientName: '',
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
          <SidebarItem icon={<Layers size={18} />} label="Manage Jobs" />
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
        <h1 className="text-3xl font-semibold mb-6">Add New Job</h1>

        {/* Job Form */}
        <div className="bg-gray-100 p-6 mb-4 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={jobForm.jobTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Company Name</label>
              <input
                type="text"
                name="company"
                value={jobForm.company}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={jobForm.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={jobForm.clientName}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>

            {/* Add Button */}
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500"
            >
              Add Job
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

// Sidebar item component
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

export default AdminJobs;
