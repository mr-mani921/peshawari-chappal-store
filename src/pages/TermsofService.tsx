    import React from 'react';
import { Shield, Clock, RefreshCw, AlertCircle } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      icon: <Shield className="h-6 w-6 text-orange-600" />,
      title: "Product Quality & Authenticity",
      content: "All Peshawari chappals are handcrafted using traditional methods and genuine leather. We guarantee the authenticity of our products and maintain strict quality control standards."
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Processing & Delivery Times",
      content: "Custom orders typically require 7-14 business days for completion. Shipping times vary by location: domestic (3-5 days), international (7-21 days). Rush orders may be available for additional fees."
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-orange-600" />,
      title: "Returns & Exchanges",
      content: "We accept returns within 30 days of delivery for unused items in original condition. Custom-made items may have specific return conditions. Exchanges are available for size adjustments within 15 days."
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-orange-600" />,
      title: "Liability & Limitations",
      content: "Our liability is limited to the purchase price of the product. We are not responsible for normal wear and tear, misuse, or damage due to improper care. Care instructions are provided with each purchase."
    }
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            Please read these terms carefully before placing your order. These terms govern your purchase and use of our products and services.
          </p>
          <div className="mt-6 text-sm text-stone-500">
            Last updated: January 2025
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {sections.map((section, index) => (
              <div key={index} className="bg-stone-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 rounded-full p-2 mr-3">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800">
                    {section.title}
                  </h3>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed Terms */}
          <div className="prose prose-stone max-w-none">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Detailed Terms & Conditions</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">1. Acceptance of Terms</h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  By placing an order with Peshawari Chappals, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not place an order.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">2. Product Information</h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  We strive to provide accurate product descriptions and images. However, due to the handcrafted nature 
                  of our products, slight variations in color, texture, and appearance may occur. Each pair is unique 
                  and may differ slightly from displayed images.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">3. Pricing & Payment</h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  Prices are displayed in Pakistani Rupees (PKR) and may change without notice. Payment is required 
                  in full before processing begins. We accept bank transfers, online payments, and other specified 
                  payment methods. All prices include VAT where applicable.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">4. Order Processing</h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  Orders are processed in the order received. Processing times vary depending on customization 
                  requirements and current workload. We will notify you of any significant delays. Rush orders 
                  may be available for an additional fee, subject to availability.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">5. Shipping & Delivery</h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  Shipping costs are calculated based on destination and weight. We are not responsible for delays 
                  caused by customs, weather, or other factors beyond our control. Risk of loss transfers to the 
                  buyer upon delivery to the shipping carrier.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">6. Care & Maintenance</h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  Proper care instructions will be provided with your purchase. Following these instructions is 
                  essential for maintaining the quality and longevity of your chappals. Warranty claims may be 
                  voided if care instructions are not followed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">7. Intellectual Property</h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  All designs, patterns, and techniques used in our products are proprietary. Reproduction or 
                  copying of our designs for commercial purposes is strictly prohibited.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">8. Dispute Resolution</h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  Any disputes will be resolved through good faith negotiation. If resolution cannot be reached, 
                  disputes will be subject to the jurisdiction of Pakistani courts.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-orange-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-stone-800 mb-4">
              Questions About These Terms?
            </h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              If you have any questions or concerns about our Terms of Service, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-300"
              >
                Contact Us
              </a>
              <a
                href="mailto:info@peshawari-chappals.com"
                className="border border-orange-600 text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-orange-600 hover:text-white transition-all duration-300"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;