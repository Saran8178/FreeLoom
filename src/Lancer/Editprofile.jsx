import React, { useState } from "react";

export default function Editprofile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    // Add API call or validation here
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
    <nav className="flex flex-wrap justify-center gap-6 py-4 text-sm text-gray-700 border-b border-gray-200">
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
  

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
