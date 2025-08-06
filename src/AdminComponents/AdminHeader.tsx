import React, { useState } from 'react';
import { Menu, Bell, User, Globe, Search, Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  showPrintButton?: boolean;
  onPrint?: () => void;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminHeader: React.FC<HeaderProps> = ({ title, showPrintButton, onPrint, setSidebarOpen }) => {
  
  const handleSidebarToggle = () => {
    if (setSidebarOpen) {
      setSidebarOpen((prev) => !prev);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSidebarToggle}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>
          
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, SKU..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;