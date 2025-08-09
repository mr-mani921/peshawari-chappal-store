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
  BarChart3,
  CreditCard,
  Receipt,
  FileText,
  User,
  Package,
  ShoppingCart,
  UserCheck,
  PieChart
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {

  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: ('Dashboard'), icon: BarChart3 },
    { path: '/admin/inventory', label: ('Inventory'), icon: Package },
    { path: '/admin/orders', label: ('Orders'), icon: ShoppingCart },
    { path: '/admin/users', label: ('User'), icon: UserCheck },
    { path: '/admin/analytics', label: ('Analytics'), icon: PieChart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={`bg-white w-64 min-h-screen shadow-lg border-r border-gray-200 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Link to='./home'>
            <div style={{ margin: "1rem" }} className="text-left lg:text-center xl:text-center 2xl:text-center md:text-center sm:text-center xs:text-center">
              <div style={{ fontSize: "2rem" }} className="logo">
                <span className="logo-text-main">Kaltoor</span>
                <span style={{ marginTop: "2rem" }} className="logo-text-accent">Chappal</span>
              </div>
              {/* Logo */}
            </div>
          </Link>
        </div>
      </div>

      <nav className="px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                      ? 'bg-white text-black shadow-lg border border-gray-100'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
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

      <div style={{ width: "18%" }} className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;