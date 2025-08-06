import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer  className="w-full  mt-auto overflow-hidden">
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-gray-900">
                Don't miss a thing
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Crafting premium custom chappals with traditional techniques and modern designs.
              </p>
              
              {/* Newsletter Signup */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium text-sm transition-colors duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Company Links */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-gray-900">
                Company
              </h3>
              <div  className="flex  flex-col gap-2 sm:gap-3">
                <a  style={{color:"black"}}  href="#" className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm sm:text-base">
                  Find our Location
                </a>
                <a  style={{color:"black"}}  href="tel:+923335742086" className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm sm:text-base flex items-center gap-2">
                  <Phone size={16} />
                  +92 333 123 123
                </a>
                <a  style={{color:"black"}}  href="tel:+923055102308" className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm sm:text-base flex items-center gap-2">
                  <Phone size={16} />
                  +92 333 123 123
                </a>
                <a  style={{color:"black"}}  href="mailto:info@chappals.pk" className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm sm:text-base flex items-center gap-2">
                  <Mail size={16} />
                  info@chappals.pk
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="flex flex-col">
              <h3   style={{color:"black"}}  className="text-lg font-semibold mb-4 sm:mb-6 text-gray-900">
                Services
              </h3>
              <div className="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-6">
   
                 <Link  style={{color:"black"}}  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm sm:text-base" to="TermsofService"> Terms of Service</Link>
                
                
                 <Link  style={{color:"black"}}  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm sm:text-base" to="contact"> Contact US</Link>
                 <Link  style={{color:"black"}}  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm sm:text-base" to="services"> Services</Link>
              
              </div>
              

            </div>

            {/* Social Media & Reviews */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-gray-900">
                Social Media
              </h3>
              
              {/* Social Links */}
              <div style={{color:"white"}} className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
                <a 
                  href="https://www.facebook.com/PeshawariChappalsPK" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-gray-900 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Facebook color='white' size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/peshawarichappalspk/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-gray-900 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Instagram color='white' size={20} />
                </a>
                <a 
                  href="https://www.youtube.com/c/PeshawariChappalPakistan" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-gray-900 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Youtube color='white' size={20} />
                </a>
              </div>

              {/* Google Reviews */}
              <div  className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                  <img 
                    src="https://lh3.googleusercontent.com/places/AKR5kUjuAEahjx3TpSwMXYO3NCeYC1Y5z50RkYESzlj02zoOMTpO7wDPzQzae-eciZ4KkQV5Op7B5MnZX-mrdkSYqykCelkjCGOhozo=s1600-w300-h300" 
                    alt="Peshawari Chappal Pakistan" 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover mx-auto sm:mx-0"
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">
                      Peshawari Chappal Pakistan
                    </h4>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <span className="text-yellow-400 text-sm sm:text-base">★★★★★</span>
                      <span className="font-semibold text-gray-900 text-sm">4.6</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Based on 309 reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" py-4 sm:py-6 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-xs sm:text-sm">
              &copy; Peshawari Chappals 2014-2025 | Designed & Developed by The Blue's
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;