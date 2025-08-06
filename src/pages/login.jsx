import React, { useState } from 'react';
import { User, Shield, Eye, EyeOff, Mail, Lock, Info, X, Check, AlertTriangle } from 'lucide-react';

const LoginPages = () => {
  const [currentPage, setCurrentPage] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showProfessionalAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      showProfessionalAlert('error', 'Please fill in all required fields');
      return;
    }

    if (currentPage === 'user') {
      showProfessionalAlert('success', 'User login successful! Welcome back.');
    } else {
      showProfessionalAlert('success', 'Admin access granted. Redirecting to dashboard...');
    }
    
    console.log(`${currentPage} login attempt:`, formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  // Professional Alert Component
  const ProfessionalAlert = () => {
    if (!showAlert) return null;

    const alertStyles = {
      success: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        icon: <Check className="w-5 h-5 text-green-500" />
      },
      error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: <AlertTriangle className="w-5 h-5 text-red-500" />
      },
      info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        icon: <Info className="w-5 h-5 text-blue-500" />
      }
    };

    const style = alertStyles[alertType];

    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div className={`${style.bg} ${style.border} border rounded-lg p-4 shadow-lg max-w-sm`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {style.icon}
            </div>
            <div className="ml-3 flex-1">
              <p className={`text-sm font-medium ${style.text}`}>
                {alertMessage}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => setShowAlert(false)}
                className={`inline-flex rounded-md p-1.5 ${style.text} hover:bg-opacity-20 focus:outline-none`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // User Info Popup Component
  const UserInfoPopup = () => {
    if (!showUserInfo) return null;

    const userInfo = currentPage === 'user' ? {
      title: 'User Portal Information',
      features: [
        'Access to personal dashboard',
        'View and edit profile settings',
        'Browse available services',
        'Track order history',
        'Customer support access'
      ],
      requirements: [
        'Valid email address required',
        'Password must be at least 8 characters',
        'Account verification needed for new users'
      ]
    } : {
      title: 'Admin Portal Information',
      features: [
        'Full system administration access',
        'User management capabilities',
        'System configuration settings',
        'Analytics and reporting tools',
        'Security monitoring dashboard'
      ],
      requirements: [
        'Administrative privileges required',
        'Two-factor authentication enabled',
        'All activities are logged and monitored',
        'VPN connection recommended'
      ]
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-96 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{userInfo.title}</h3>
              <button
                onClick={toggleUserInfo}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Features & Access</h4>
                <ul className="space-y-1">
                  {userInfo.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Requirements</h4>
                <ul className="space-y-1">
                  {userInfo.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Info className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={toggleUserInfo}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UserLogin = () => (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
            <button
              onClick={toggleUserInfo}
              className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
            >
              <Info className="w-4 h-4 text-blue-500" />
            </button>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminLogin = () => (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
            <button
              onClick={toggleUserInfo}
              className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
            >
              <Info className="w-4 h-4 text-red-500" />
            </button>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h2>
          <p className="text-gray-600">Secure administrative access</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter admin email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex">
                <Shield className="h-5 w-5 text-red-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Secure admin access. All activities are logged and monitored.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-orange-700 focus:ring-4 focus:ring-red-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Access Admin Panel
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              For security issues, contact IT support
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>

      {/* Professional Alert */}
      <ProfessionalAlert />

      {/* User Info Popup */}
      <UserInfoPopup />

      {/* Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white rounded-full shadow-lg border border-gray-200 p-1 flex">
          <button
            onClick={() => setCurrentPage('user')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              currentPage === 'user'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => setCurrentPage('admin')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              currentPage === 'admin'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-gray-600 hover:text-red-500'
            }`}
          >
            Admin Login
          </button>
        </div>
      </div>

      {/* Content */}
      {currentPage === 'user' ? <UserLogin /> : <AdminLogin />}
    </div>
  );
};

export default LoginPages;