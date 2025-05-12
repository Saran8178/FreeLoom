import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });

      console.log('Login Response:', response.data);

      const { token, role } = response.data;

      if (!token || !role) {
        setError("Invalid response from server.");
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'USER') {
        navigate('/userdashboard');
      } else if (role === 'RECRUITER') {
        navigate('/admindashboard');
      } else if (role === 'ADMIN') {
        navigate('/mastercontrols');
      } else {
        setError('Unknown role received.');
        return;
      }

      onClose();
    } catch (err) {
      setError('Invalid credentials or error during login.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Welcome Back</h2>

        <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold text-gray-600">X</button>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm bg-[whitesmoke] focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account? <a href="/register" className="text-green-600 font-medium hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;