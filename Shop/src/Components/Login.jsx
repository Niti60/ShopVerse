import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (isRegister) {
        response = await authAPI.register(formData);
      } else {
        response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
      }

      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex items-center justify-center ">
    {/* Background decorative elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-48 -right-24 blur-3xl"></div>
      <div className="absolute w-80 h-80 bg-white opacity-5 rounded-full -bottom-40 -left-20 blur-3xl"></div>
      <div className="absolute w-64 h-64 bg-white opacity-5 rounded-full top-1/2 right-1/4 blur-2xl"></div>
    </div>

    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-4 relative z-10 transform transition-all duration-500">
      {/* Logo and Header */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-gray-500 text-[12px]">
          {isRegister ? 'Sign up to get started' : 'Sign in to your account'}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-2 bg-red-50 border border-red-200 text-red-700 px-4 py-1 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {isRegister && (
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
              placeholder="John Doe"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete={isRegister ? "new-password" : "current-password"}
            className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
            placeholder="••••••••"
            required
          />
        </div>

        {isRegister && (
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Account Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-semibold py-3 px-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            isRegister ? 'Create Account' : 'Sign In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">or</span>
        </div>
      </div>

      {/* Toggle */}
      <p className="text-center text-gray-600 text-sm">
        {isRegister ? 'Already have an account? ' : "Don't have an account? "}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="font-semibold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent hover:from-purple-700 hover:to-indigo-800 transition-all duration-200"
        >
          {isRegister ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  </div>
);
}

export default Login;