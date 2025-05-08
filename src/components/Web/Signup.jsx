import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ isOpen, onClose, openAdminSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null; // Don't render if modal is closed

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', newUser);
      console.log('Signup successful:', response.data);
      // After successful signup, you can optionally redirect or display a success message
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl flex">
        {/* Left: Image */}
        <div className="w-1/2 bg-gray-200 flex items-center justify-center">
          <img 
            src="https://www.ikeva.com/wp-content/uploads/2017/11/individuals-fail-to-become-freelancers.jpg" 
            alt="Sign Up" 
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Right: Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Create Account</h2>

          {/* Close Button */}
          <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold text-gray-600">X</button>

          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm bg-[whitesmoke] focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm bg-[whitesmoke] focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm bg-[whitesmoke] focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition">
              Sign Up
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account? <a href="#!" onClick={openAdminSignup} className="text-green-600 font-medium hover:underline">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
