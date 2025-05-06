import React from 'react';

const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Welcome Back</h2>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold text-gray-600">X</button>

        {/* Login Form */}
        <form className="space-y-6">
          {/* Form Fields */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm bg-[whitesmoke] focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm bg-[whitesmoke] focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition">
            Log In
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account? <a href="/register" className="text-green-600 font-medium hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
