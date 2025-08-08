import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Home, Globe } from 'lucide-react';

interface BillingFormProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    streetAddress: string;
    country: string;
  };
  setFormData: (data: any) => void;
}

const BillingForm: React.FC<BillingFormProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
        <span>Billing & Shipping</span>
      </h2>

      <form className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
            Full name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email address
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Town / City */}
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
            Town / City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              placeholder="Enter your city"
            />
          </div>
        </div>

        {/* Street Address */}
        <div>
          <label htmlFor="streetAddress" className="block text-sm font-semibold text-gray-700 mb-2">
            Street address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Home size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              placeholder="House number and street name"
            />
          </div>
        </div>

        {/* Country / Region */}
        <div>
          <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
            Country / Region <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none bg-white"
            >
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Afghanistan">Afghanistan</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;