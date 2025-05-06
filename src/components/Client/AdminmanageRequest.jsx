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

const AdminManageRequest = () => {
  // Static sample job requests array
  const [jobRequests, setJobRequests] = useState([
    { id: 1, jobTitle: 'Software Engineer', company: 'ABC Corp', clientName: 'Client A', status: 'requested' },
    { id: 2, jobTitle: 'Data Scientist', company: 'XYZ Ltd', clientName: 'Client B', status: 'requested' },
    { id: 3, jobTitle: 'Project Manager', company: 'LMN Inc', clientName: 'Client C', status: 'requested' },
  ]);

  const handleApprove = (jobId) => {
    // Update the status of the job request locally
    setJobRequests(prevRequests =>
      prevRequests.map(job =>
        job.id === jobId ? { ...job, status: 'approved' } : job
      )
    );
  };

  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
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
        <h1 className="text-3xl font-semibold mb-6">Manage Job Requests</h1>
        <table className="w-full bg-whitesmoke shadow-md rounded-lg bg-slate-100">
          <thead>
            <tr className="bg-slate-200 text-black">
              <th className="p-3 text-black">ID</th>
              <th className="p-3">Job Title</th>
              <th className="p-3">Company</th>
              <th className="p-3">Client Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobRequests.map(request => (
              <tr key={request.id} className="border-b">
                <td className="p-3 text-black">{request.id}</td>
                <td className="p-3 text-black">{request.jobTitle}</td>
                <td className="p-3 text-black">{request.company}</td>
                <td className="p-3 text-black">{request.clientName}</td>
                <td className="p-3 text-black">{request.status}</td>
                <td className="p-3 text-black">
                  {request.status === 'requested' && (
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400"
                      onClick={() => handleApprove(request.id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AdminManageRequest;
