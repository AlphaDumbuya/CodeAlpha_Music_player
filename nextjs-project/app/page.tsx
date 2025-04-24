"use client";

import React, { useState } from 'react';

const myStyle = {
  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  minHeight: '100vh',
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      window.location.href = '/admin-dashboard';
    } else {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <main style={myStyle} className="flex items-center justify-center p-4">
      <div className="login-card bg-white rounded-xl p-8 w-full max-w-md shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Shalom Radio Admin</h1>
          <p className="text-gray-600 mt-2">Sign in to manage your website content</p>
        </div>

        <form id="loginForm" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" id="password" name="password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">Sign In</button>
          </div>
        </form>

        {loginError && <div id="loginError" className="mt-4 text-red-600 text-sm">{loginError}</div>}
      </div>
    </main>
  );
};