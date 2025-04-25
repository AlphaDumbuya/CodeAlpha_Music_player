
"use client";

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faSignOutAlt,
  faUserShield,
  faHome,
  faCalendarWeek,
  faVideo,
  faTv,
  faNewspaper,
  faUsers,
  faHeadphones,
  faBroadcastTower,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube as faYoutubeBrand } from '@fortawesome/free-brands-svg-icons';

export default function AdminDashboard() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('adminAuth') !== 'true') {
        window.location.href = '/';
        return;
      }

      const profileToggle = document.getElementById('profileToggle');
      const profileDropdown = document.getElementById('profileDropdown');
      const logoutBtn = document.getElementById('logoutBtn');
      const mobileMenuButton = document.getElementById('mobileMenuButton');
      const sidebar = document.getElementById('sidebar');
      const contentArea = document.getElementById('contentArea');

      if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', function (e) {
          e.stopPropagation();
          profileDropdown.classList.toggle('hidden');
        });
      }

      const closeDropdown = (e: MouseEvent) => {
        if (profileDropdown && !profileDropdown.contains(e.target as Node) && profileToggle && !profileToggle.contains(e.target as Node) ) {
          profileDropdown.classList.add('hidden');
        }
      };
      document.addEventListener('click', closeDropdown);

      if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
          localStorage.removeItem('adminAuth');
          window.location.href = '/';
        });
      }

      if (mobileMenuButton && sidebar && contentArea) {
        mobileMenuButton.addEventListener('click', function () {
          sidebar.classList.toggle('-translate-x-full');
        });
      }

      if (sidebar && contentArea) {
        contentArea.addEventListener('click', function () {
          if (!sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
          }
        });
      }

      return () => {
        document.removeEventListener('click', closeDropdown);
      };
    }
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center justify-between w-full">
            <button id="mobileMenuButton" className="md:hidden bg-blue-600 text-white w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-md">
              <FontAwesomeIcon icon={faBars} className="text-lg sm:text-base" />
            </button>
            <h1 className="text-xl font-semibold text-center md:text-left text-gray-900 mx-auto md:mx-0 w-full md:w-auto">
              Dashboard
            </h1>
          </div>
          <div className="relative">
            <div id="profileToggle" className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="text-blue-600 text-sm sm:text-base" />
            </div>
            <div id="profileDropdown" className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg hidden z-50">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <button id="logoutBtn" className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div id="sidebar" className="fixed top-0 left-0 h-screen w-52 md:w-64 bg-gray-800 text-white transform -translate-x-full md:translate-x-0 transition-transform duration-300 z-30 pt-[4.5rem] backdrop-blur-sm">
        <div className="flex flex-col h-full">
          <div className="p-4 pt-24 md:pt-18 flex items-center border-b border-blue-700">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faUserShield} />
            </div>
            <div>
              <h2 className="font-semibold">Alpha Dumbuya</h2>
              <p className="text-xs text-blue-200">Administrator</p>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <a href="#news" className="block py-2 px-4 hover:bg-blue-700 transition"><FontAwesomeIcon icon={faHome} className="mr-2" /> Home</a>
            <a href="#weekly" className="block py-2 px-4 hover:bg-blue-700 transition"><FontAwesomeIcon icon={faCalendarWeek} className="mr-2" /> Activities</a>
            <a href="#live" className="block py-2 px-4 hover:bg-blue-700 transition"><FontAwesomeIcon icon={faVideo} className="mr-2" /> Live Streaming</a>
            <a href="#featured" className="block py-2 px-4 hover:bg-blue-700 transition"><FontAwesomeIcon icon={faTv} className="mr-2" /> Featured Programs</a>
            <a href="#news" className="block py-2 px-4 hover:bg-blue-700 transition"><FontAwesomeIcon icon={faNewspaper} className="mr-2" /> Manage News</a>
            <a href="#staffs" className="block py-2 px-4 hover:bg-blue-700 transition"><FontAwesomeIcon icon={faUsers} className="mr-2" /> Manage Staffs </a>
            <a href="#youtube" className="block py-2 px-4 hover:bg-blue-700 transition"><FontAwesomeIcon icon={faYoutubeBrand} className="mr-2" /> Manage Videos</a>
            <a href="#audio" className="block py-2 px-4 hover:bg-blue-700 transition"><FontAwesomeIcon icon={faHeadphones} className="mr-2" /> Manage Audio</a>
          </nav>
        </div>
      </div>

      <div id="contentArea" className="content-area md:ml-64 pt-[4.5rem] min-h-screen bg-gray-100 overflow-y-auto">
        <main className="min-h-screen flex-1 pt-24 overflow-y-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome!</h2>
            <p className="text-sm text-gray-500 mt-2">
              This is your main hub where you can manage all the necessary platform tasks.
              Click the menu and explore the options below to get started.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Latest Updates</h3>
            <ul className="space-y-4">
              <li className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faBroadcastTower} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Announcement</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </li>
              <li className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faCogs} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">System Maintenance</p>
                  <p className="text-xs text-gray-500">30 minutes ago</p>
                </div>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}