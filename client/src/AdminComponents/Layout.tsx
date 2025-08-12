import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Clock,
  DollarSign,
  Calendar,
  TrendingUp,
  Settings,
  Building2,
  Database,
  Package,
  ShoppingCart,

} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Layout: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
 
  const location = useLocation();

  const menuItems = [
     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'inventory', label: 'Inventory', icon: Package, path: '/admin/inventory' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, path: '/admin/analytics' },
   { path: '/', icon: Database, label: 'Logout' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside  className={`bg-white-500  w-64 min-h-screen shadow-lg border-r border-gray-200 text-bluck  ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
      <div className="p-6">
        <div className="flex items-center space-x-3">
          
          <div className="logo">
            <Link to="/" className="logo-link" >
              <span className="logo-text-main">Kaltoor</span> 
              <span className="logo-text-accent">Chappal</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className="px-3 text-white">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li  key={item.path}>
                <Link  style={{color:"black"}} 
                  to={item.path}
                  className={`flex items-center space-x-3 px-1 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ?  'bg-bluck-600 text-white shadow-md '
                      : '  hover:white-indigo-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Layout;
