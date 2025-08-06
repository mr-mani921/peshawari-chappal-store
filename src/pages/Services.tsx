import React from 'react';
import { Scissors, Palette, Package, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Scissors className="h-10 w-10 text-orange-600" />,
      title: "Custom Handcrafting",
      description: "Each pair is individually handcrafted by skilled artisans using traditional techniques passed down through generations.",
      features: ["Hand-stitched construction", "Premium leather selection", "Traditional tooling patterns", "Personalized sizing"]
    },
    {
      icon: <Palette className="h-10 w-10 text-orange-600" />,
      title: "Design Customization",
      description: "Choose from various colors, patterns, and styles to create your perfect pair of Peshawari chappals.",
      features: ["Multiple color options", "Pattern variations", "Size customization", "Special requests"]
    },
    {
      icon: <Package className="h-10 w-10 text-orange-600" />,
      title: "Quality Assurance",
      description: "Every chappal undergoes rigorous quality checks to ensure durability, comfort, and authentic craftsmanship.",
      features: ["Material inspection", "Comfort testing", "Durability assessment", "Authenticity guarantee"]
    },
    {
      icon: <Users className="h-10 w-10 text-orange-600" />,
      title: "Customer Support",
      description: "Our dedicated team provides excellent customer service from order to delivery and beyond.",
      features: ["Personal consultation", "Fitting guidance", "After-sales support", "Care instructions"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your preferences, sizing, and any special requirements for your custom chappals."
    },
    {
      step: "02",
      title: "Design Selection",
      description: "Choose from our collection or work with us to create a completely custom design."
    },
    {
      step: "03",
      title: "Handcrafting",
      description: "Our skilled artisans begin the meticulous process of handcrafting your chappals."
    },
    {
      step: "04",
      title: "Quality Check",
      description: "Each pair undergoes thorough quality inspection before packaging and shipping."
    },
    {
      step: "05",
      title: "Delivery",
      description: "Your authentic Peshawari chappals are carefully packaged and shipped to your location."
    }
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Our Craftsmanship Services
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Discover the art and tradition behind every pair of authentic Peshawari chappals. 
            We combine centuries-old techniques with modern quality standards.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-stone-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:bg-orange-50"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800">
                    {service.title}
                  </h3>
                </div>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-stone-600">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Our Crafting Process
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              From initial consultation to final delivery, we ensure every step meets our high standards of quality and authenticity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Order Your Custom Chappals?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of tradition and comfort. Let us create a pair that's uniquely yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-stone-100 transition-all duration-300 hover:shadow-lg"
            >
              Start Your Order
            </a>
            <a
              href="tel:+929112334567"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;