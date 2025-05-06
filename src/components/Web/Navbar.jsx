import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';
import Login from '../Web/Login';
import Signup from '../Web/Signup'; // Adjust the path for the Signup component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Manage Login modal visibility
  const [showSignup, setShowSignup] = useState(false); // Manage Signup modal visibility

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      {/* Login Modal */}
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />

      {/* Signup Modal */}
      <Signup isOpen={showSignup} onClose={() => setShowSignup(false)} />

      <div className="w-full h-[8vh] flex justify-between items-center bg-green-600 px-8 shadow-md">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 text-white text-2xl font-bold">
          <FaBriefcase />
          <span><strong>Free</strong>loom</span>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex gap-8 text-black">
          <NavLink to="/">Home</NavLink>
          
          {/* Button to open the login modal */}
          <button 
            onClick={() => setShowLogin(true)} 
            className="text-white bg-green-600 px-4 py-2 rounded-md focus:outline-none"
          >
            Login
          </button>
          
          {/* Button to open the signup modal */}
          <button 
            onClick={() => setShowSignup(true)} 
            className="text-white bg-green-600 px-4 py-2 rounded-md focus:outline-none"
          >
            Sign Up
          </button>

          
          <NavLink to={isLoggedIn ? '/user/jobs' : '/common/job'}>Jobs</NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
