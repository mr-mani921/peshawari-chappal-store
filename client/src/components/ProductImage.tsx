import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const ProductImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={images[selectedImage]}
            alt="Product"
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
          />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>

          {/* Zoom Button */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
          >
            <ZoomIn size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === index
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
