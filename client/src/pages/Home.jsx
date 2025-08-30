import React from "react";
import ProductCard from "../components/ProductCard";
import logoimg from "../assets/bgc-removebg-preview.png";
import { useProducts } from "./Contexts/Product";
import UserHistory from "../components/UserHistory";

const Home = () => {
  const { products } = useProducts();

  return (
    <>
      <div className="w-full overflow-x-hidden">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-[70vh] flex items-center justify-center py-[60px] px-5 lg:min-h-[70vh] lg:py-[60px] lg:px-5 xl:min-h-[70vh] xl:py-[60px] xl:px-5 2xl:min-h-[70vh] 2xl:py-[60px] 2xl:px-5 md:min-h-[50vh] md:py-10 md:px-5 sm:min-h-[45vh] sm:py-[30px] sm:px-[15px] xs:py-5 xs:px-[10px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-[60px] lg:gap-[60px] xl:gap-[60px] 2xl:gap-[60px] max-w-[1200px] w-full items-center lg:grid-cols-1 lg:gap-10 lg:text-center xl:grid-cols-1 xl:gap-10 xl:text-center 2xl:grid-cols-1 2xl:gap-10 2xl:text-center md:gap-[30px] md:text-center sm:gap-5 sm:text-center xs:gap-5 xs:text-center">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <img
                src={logoimg}
                alt="SHIKARI Norozi Chappal"
                className="max-h-[600px] lg:max-h-[350px] xl:max-h-[350px] 2xl:max-h-[350px] object-contain drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 md:max-h-[300px] sm:max-h-[250px] xs:max-h-[200px]"
              />
            </div>

            {/* Text Content */}
            <div className="text-left lg:text-center xl:text-center 2xl:text-center md:text-center sm:text-center xs:text-center text-black">
              <div style={{ fontSize: "2rem" }} className="logo">
                <h1>SHIKARI</h1>
                <h5>Norozi Chappal</h5>
                <span className="logo-text-main">Kaltoor</span>
                <span
                  style={{ marginTop: "2rem" }}
                  className="logo-text-accent"
                >
                  Chappal
                </span>
              </div>
              {/* Logo */}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white py-[60px] lg:py-[50px] xl:py-[50px] 2xl:py-[50px] md:py-10 sm:py-[30px] xs:py-[25px]">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-5 xl:px-5 2xl:px-5 md:px-[15px] sm:px-[10px] xs:px-[10px]">
            <div className="text-center">
              <h2 className="text-4xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-semibold text-black mb-[30px] leading-tight md:text-2xl sm:text-xl xs:text-lg">
                Discover Pakistan's Widest Range of Handmade Peshawari Chappals
              </h2>
              <p className="text-lg lg:text-lg xl:text-lg 2xl:text-lg text-gray-600 leading-relaxed max-w-[900px] mx-auto md:text-base md:px-[10px] sm:text-sm sm:px-[5px] xs:text-sm xs:px-[5px]">
                <strong className="text-red-600 font-semibold">
                  Kaltoor Chappal.pk
                </strong>{" "}
                is Pakistan's trusted source for original handmade Peshawari
                chappals, proudly preserving this timeless craft since 2010.
                Each pair is crafted with premium leather and traditional
                stitching, reflecting generations of artisan expertise. Our
                brand stands for quality, heritage, and affordability—offering
                unmatched comfort and durability. Explore our signature Norozi,
                Kaptaan, and classic styles, along with new seasonal arrivals
                that blend tradition with modern flair. From everyday wear to
                special occasions.{" "}
                <strong className="text-red-600 font-semibold">
                  Kaltoor Chappal
                </strong>{" "}
                delivers authentic designs and nationwide service you can count
                on.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-gray-50 py-[60px] lg:py-[50px] xl:py-[50px] 2xl:py-[50px] md:py-10 sm:py-[30px] xs:py-[25px]">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-5 xl:px-5 2xl:px-5 md:px-[15px] sm:px-[10px] xs:px-[10px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-[30px] lg:gap-[30px] xl:gap-[30px] 2xl:gap-[30px] mb-[50px] md:gap-5 sm:gap-[15px] xs:gap-[15px]">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* todo */}
            {/* <div className="text-center mt-8">
              <a href="/products" className="inline-block px-[30px] py-3 border-none rounded-lg text-base font-semibold text-decoration-none cursor-pointer transition-all duration-300 ease-in-out bg-[#DA3F3F] text-white hover:bg-[#B91C1C] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(218,63,63,0.3)]">
                View All Products
              </a>
            </div> */}
          </div>
        </section>
        <section className="bg-gray-50 py-[60px] lg:py-[50px] xl:py-[50px] 2xl:py-   [50px] md:py-10 sm:py-[30px] xs:py-[25px]">
          <h2 className="text-4xl  lg:text-3xl xl:text-3xl font-semibold text-black mb-[30px] leading-tight md:text-2xl sm:text-xl xs:text-lg text-center">
            Order History
          </h2>
          <div className="w-full flex justify-center items-center px-4 xs:px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <UserHistory />
          </div>
        </section>
        {/* WhatsApp Chat Button */}
        <div className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-5 rounded-full flex items-center gap-2 cursor-pointer shadow-lg font-medium transition-all duration-300 ease-in-out z-[1000] hover:-translate-y-0.5 hover:shadow-xl sm:py-[10px] sm:px-[15px] sm:text-sm sm:bottom-[15px] sm:right-[15px] xs:py-[8px] xs:px-3 xs:text-xs">
          <span className="text-xl">💬</span>
          <span>Hi, Chat with us</span>
        </div>
      </div>
    </>
  );
};

export default Home;
