import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Users, FileText, DollarSign, Layers, Settings, LogOut } from 'lucide-react';

const AdminJobs = () => {
  const [jobForm, setJobForm] = useState({
    jobTitle: '',
    company: '',
    description: '',
    clientName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobForm({
      ...jobForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (role !== "RECRUITER") {
      alert("Only recruiters can add jobs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/recruiter/jobs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: jobForm.jobTitle,
          description: jobForm.description,
          clientName: jobForm.clientName,
          recruiterId: userId
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Job Added:", result);
        alert("Job successfully added");

        // Reset the form
        setJobForm({
          jobTitle: '',
          company: '',
          description: '',
          clientName: '',
        });
      } else {
        const err = await response.text();
        console.error("Failed to add job:", err);
        alert("Failed to add job");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the job.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100 text-black">
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
            onClick={() => navigate("/adminsettings")}
          />
          <SidebarItem icon={<LogOut size={18} />} label="Logout" />
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6">Add New Job</h1>

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

function SidebarItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 bg-white rounded hover:bg-gray-300 text-left shadow-sm"
    >
      {icon} <span>{label}</span>
    </button>
  );
}

export default AdminJobs;
