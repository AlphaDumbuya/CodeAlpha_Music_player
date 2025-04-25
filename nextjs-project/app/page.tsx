"use client";

import React, { useState, useEffect, useRef } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { FcGoogle } from 'react-icons/fc';

declare global {
  interface Window {
    google: any;
    }
}

const myStyle = {
  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      window.location.href = '/admin-dashboard';
    }
  }, []);

  const customLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      window.location.href = '/admin-dashboard';
    } else {
      setLoginError('Invalid credentials.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customLogin();
  };

  async function handleCredentialResponse(response: any) {
        const responsePayload = decodeJwtResponse(response.credential);
        console.log("ID: " + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Given Name: ' + responsePayload.given_name);
        console.log('Family Name: ' + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);
        
        if (responsePayload.email === "admin@gmail.com") {
            localStorage.setItem('adminAuth', 'true');
            window.location.href = '/admin-dashboard';
        } else {
            setLoginError("Invalid credentials, Please login with admin account.");
        }
    }

  useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (typeof window !== 'undefined' && window.google) {
                window.google.accounts.id.initialize({
                    client_id: '164707415657-df0e7br4smhm3ic9oth99kca06kh5aom.apps.googleusercontent.com',
                    callback: handleCredentialResponse
                });
            }
        };
        initializeGoogleSignIn();
    }, []);
    
    function decodeJwtResponse(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

  const togglePasswordVisibility = () => {    
    if (passwordInputRef.current) {
      passwordInputRef.current.type = !showPassword ? 'text' : 'password';
    }
    setShowPassword(!showPassword);
  };

    return (
    <main style={myStyle} className="flex items-center justify-center p-4">
      <div className="login-card bg-white rounded-xl p-8 w-full max-w-md shadow-md relative">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-800">Shalom Radio Admin</h1>
            <p className="text-base text-gray-600 mt-2">Sign in to manage your website content</p>
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
              <div className="relative">
                  <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} ref={passwordInputRef} />
                      <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none">
                      {showPassword ? <EyeSlashIcon className="h-4 w-4 text-gray-500" /> : <EyeIcon className="h-4 w-4 text-gray-500" />}
                      </button>
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="w-full bg-blue-600 text-white text-base py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">Sign In</button>
            </div>          
           <div>
              <button onClick={() => window.google.accounts.id.prompt()} className="w-full mt-4 bg-white border-2 border-gray-300 text-gray-800 text-base py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center"><FcGoogle className="mr-2 h-6 w-6" /> Sign in with Google</button>
          </div>
        </form>
            {loginError && <div id="loginError" className="mt-4 text-red-600 text-base">{loginError}</div>}
            {resetEmailSent && (<div className="mt-4 text-green-600 text-base">Password reset email sent. Please check your inbox.</div>)}
        </div>
    </main>
  );}