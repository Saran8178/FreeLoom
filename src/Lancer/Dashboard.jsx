import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, User, Bookmark, Users, LogOut, Briefcase } from "lucide-react";

// Modal Component
function BriefcaseBeta({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <div className="mb-4 text-indigo-600 flex justify-center">
          <Briefcase className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
        <p className="text-gray-600 text-sm">
          Briefcase will be available soon in <strong>Beta</strong> with the <strong>Professional</strong> plan.
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [showBriefcase, setShowBriefcase] = useState(false);
  const navigate = useNavigate(); // ✅ For routing

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); // Redirect to homepage
  };
  return (
    <div className="min-h-screen bg-white">
      {showBriefcase && <BriefcaseBeta onClose={() => setShowBriefcase(false)} />}

      {/* Top Categories Nav */}
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-gray-700 text-white py-12 px-6 md:px-20">
        <h1 className="text-4xl font-bold mb-2">Meet FreeLoom</h1>
        <p className="text-lg mb-6 max-w-xl">
          Instantly create high-quality work using a freelancer’s custom-trained AI model, tailored to match their unique style.
        </p>
        <button
  onClick={() => navigate("/userjobs")}
  className="bg-white text-black font-medium px-6 py-2 rounded-full flex items-center gap-2"
>
  Explore Jobs<ArrowRight size={16} />
</button>

      </section>

      {/* Recommendations */}
      <div className="flex flex-col md:flex-row justify-center gap-6 px-6 md:px-20 mt-6">
        <div className="bg-gray-100 p-4 rounded-xl flex-1">
          <p className="text-xs text-gray-500">RECOMMENDED FOR YOU</p>
          <h3 className="text-lg font-semibold mb-2 text-black">Post a project brief</h3>
          <p className="text-sm text-gray-600 mb-3">Get tailored offers for your needs.</p>
          <button
            onClick={() => setShowBriefcase(true)}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Get started
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl flex-1">
          <p className="text-xs text-gray-500">BUSINESS RECOMMENDATIONS</p>
          <h3 className="text-lg font-semibold mb-2 text-black">Tailor Fiverr to your needs</h3>
          <p className="text-sm text-gray-600 mb-3">Tell us a bit about your business.</p>
          <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Add your Info</button>
        </div>
      </div>

      {/* Popular Categories */}
      <section className="mt-10 px-6 md:px-20">
        <h2 className="text-2xl font-semibold mb-4">Explore popular categories on Fiverr</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Categories */}
          <div className="space-y-3 w-full md:w-1/5">
            <button
              className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
              onClick={() => navigate("/userprofile")}
            >
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
            <button
  className="w-full border px-4 py-2 rounded text-left text-black bg-gray-100 flex items-center gap-2"
  onClick={handleLogout}
>
  <LogOut size={16} /> Logout
</button>
 
          </div>

          {/* Video Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-white shadow-md rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gray-200">
                    <video
                      className="w-full h-full object-cover"
                      src={`/videos/video${i}.mp4`}
                      autoPlay
                      muted
                      loop
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold">Seller Name</p>
                    <p className="text-sm text-gray-600 truncate">Service description goes here.</p>
                    <p className="text-sm mt-1">⭐ 5.0 (200)</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
