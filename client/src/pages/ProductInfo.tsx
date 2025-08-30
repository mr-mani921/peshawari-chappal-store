import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Star,
  Heart,
  Share2,
  MessageCircle,
  HelpCircle,
  ShoppingCart,
  Zap,
  Palette,
  Settings,
  Truck,
  ChartCandlestick,
} from "lucide-react";
import { addToCart, openCart } from "../store/slices/cartSlice";
import { toggleWishlistItem } from "../store/slices/wishlistSlice";
import { Link, useParams } from "react-router-dom";
import { GitCompare, Ruler, Phone } from "lucide-react";
import { useProducts } from "./Contexts/Product";
import ChappalCustomizer from "../components/ChappalCustomizer";
import {
  createProductObject,
  calculateCustomizationPrice,
} from "../utils/orderUtils";
import ProductCard from "../components/ProductCard";
const ProductInfo = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((product) => product.id == id);

  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: cartItems } = useSelector((state) => state.cart);

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Customization states
  const [selectedColor, setSelectedColor] = useState("mustard");
  const [selectedStyle, setSelectedStyle] = useState("classic");
  const [selectedMaterial, setSelectedMaterial] = useState("leather");
  const [selectedSole, setSelectedSole] = useState("rubber");
  const [isCustomizing, setIsCustomizing] = useState(false);

  const productId = "09274";
  // const sizes = product.size
  const rating = 4.8;
  const reviewCount = 2847;

  // Check if product is in wishlist
  // const isInWishlist = wishlistItems.some(item => item.id === productId);

  // Customization options
  const colorOptions = [
    { name: "mustard", label: "Mustard Yellow", hex: "#FFDB58", price: 0 },
    { name: "brown", label: "Classic Brown", hex: "#8B4513", price: 0 },
    { name: "black", label: "Midnight Black", hex: "#2C2C2C", price: 200 },
    { name: "tan", label: "Desert Tan", hex: "#D2B48C", price: 150 },
    { name: "maroon", label: "Deep Maroon", hex: "#800000", price: 300 },
  ];

  const styleOptions = [
    { name: "classic", label: "Norozi Chappals", price: 0 },
    { name: "modern", label: "Zardari Chappals", price: 500 },
    { name: "embroidered", label: "Kaptaan Chappals", price: 1200 },
    { name: "beaded", label: "Peshawari Chappals ", price: 800 },
  ];

  const materialOptions = [
    { name: "leather", label: "Premium Leather", price: 0 },
    { name: "suede", label: "Soft Suede", price: 700 },
    { name: "canvas", label: "Durable Canvas", price: -500 },
    { name: "velvet", label: "Luxury Velvet", price: 1000 },
  ];

  const soleOptions = [
    { name: "rubber", label: "Rubber Sole", price: 0 },
    { name: "leather", label: "Leather Sole", price: 400 },
    { name: "cushioned", label: "Cushioned Comfort", price: 600 },
    { name: "anti-slip", label: "Anti-Slip Grip", price: 350 },
  ];

  // Product images based on style
  const getImagesForStyle = (style) => {
    const imageMap = {
      classic: [
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/23-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-119-JPG-300x300.webp",
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/Zalmi-chappal-min-jpg-300x300.webp",
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      ],
      modern: [
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/38-300x300.jpg",
      ],
      embroidered: [
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp",
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal1-min-1-jpg-300x300.webp",
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      ],
      beaded: [
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/482-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/372-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/382-300x300.jpg",
      ],
    };

    return imageMap[style] || imageMap["classic"];
  };

  // Get current images based on selected style
  const images = getImagesForStyle(selectedStyle);

  // Reset selected image when style changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedStyle]);

  const basePrice = 6500;
  const customizationPrice = calculateCustomizationPrice({
    selectedColor,
    selectedStyle,
    selectedMaterial,
    selectedSole,
  });
  const unitPrice = basePrice + customizationPrice;
  const totalPrice = unitPrice * quantity;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Create product object for cart/wishlist
  const createProductObjectLocal = () => {
    return createProductObject(product, {
      selectedColor,
      selectedStyle,
      selectedMaterial,
      selectedSole,
      selectedSize,
      quantity,
    });
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    const product = createProductObjectLocal();

    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedOptions: {
          size: selectedSize,
          color: selectedColor,
          style: selectedStyle,
          material: selectedMaterial,
          sole: selectedSole,
        },
        cartId: `${productId}-${selectedSize}-${selectedColor}-${selectedStyle}-${selectedMaterial}-${selectedSole}`, // Unique ID for cart item with variations
      })
    );

    // Show success message (you can replace this with a toast notification)
    alert(`Added ${quantity} item(s) to cart!`);
  };

  // Handle buy now
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    handleAddToCart();
    dispatch(openCart());
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    const product = createProductObjectLocal();
    dispatch(toggleWishlistItem(product));
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${
            selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
          } Smart Zalmi Chappal`,
          text: `Check out this amazing chappal for PKR ${unitPrice.toLocaleString()}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Product link copied to clipboard!");
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        gap: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left Side - Product Images */}
      <div style={{ flex: "1", maxWidth: "500px" }}>
        {/* Main Image */}
        <div
          style={{
            marginBottom: "20px",
            border: "2px solid #f0f0f0",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={selectedImage !== 0 ? images[selectedImage] : product.image}
            alt="Product Main"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              filter:
                selectedColor === "black"
                  ? "brightness(0.7) sepia(1) hue-rotate(200deg)"
                  : selectedColor === "brown"
                  ? "sepia(0.8) hue-rotate(20deg)"
                  : selectedColor === "maroon"
                  ? "sepia(1) hue-rotate(320deg) saturate(1.5)"
                  : selectedColor === "tan"
                  ? "sepia(0.5) brightness(1.1)"
                  : "none",
            }}
          />
          {customizationPrice !== 0 && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#FF6B6B",
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
                fontSize: "12px",
                fontWeight: "bold",
                zIndex: 10,
              }}
            >
              +PKR {customizationPrice}
            </div>
          )}

          {/* Wishlist Heart */}
          <button
            onClick={handleWishlistToggle}
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              zIndex: 10,
            }}
          >
            <Heart
              size={20}
              style={{
                color: product ? "#FF6B6B" : "#666",
                fill: product ? "#FF6B6B" : "none",
              }}
            />
          </button>
        </div>

        {/* Thumbnail Images */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {images.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                border:
                  selectedImage === index
                    ? "3px solid #FF6B6B"
                    : "2px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
                filter:
                  selectedColor === "black"
                    ? "brightness(0.7) sepia(1) hue-rotate(200deg)"
                    : selectedColor === "brown"
                    ? "sepia(0.8) hue-rotate(20deg)"
                    : selectedColor === "maroon"
                    ? "sepia(1) hue-rotate(320deg) saturate(1.5)"
                    : selectedColor === "tan"
                    ? "sepia(0.5) brightness(1.1)"
                    : "none",
              }}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Product Info */}
      <div style={{ flex: "1", maxWidth: "600px" }}>
        {/* Sale Badge */}
        <div
          style={{
            display: "inline-block",
            background: "#FF6B6B",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          SALE
        </div>

        {/* Product Title & Rating */}
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
              color: "#333",
            }}
          >
            {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}{" "}
            Smart Zalmi Chappal — {productId}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex" }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  style={{
                    color: i < Math.floor(rating) ? "#FFD700" : "#ddd",
                    fill: i < Math.floor(rating) ? "#FFD700" : "none",
                  }}
                />
              ))}
            </div>
            <span style={{ color: "#666", fontSize: "14px" }}>
              ({reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Price Info */}
        <div style={{ marginBottom: "25px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "5px",
            }}
          >
            <span
              style={{
                textDecoration: "line-through",
                color: "#999",
                fontSize: "18px",
              }}
            >
              PKR {(10500 * quantity).toLocaleString()}.00
            </span>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#FF6B6B",
              }}
            >
              PKR {totalPrice.toLocaleString()}.00
            </span>
          </div>

          {/* Unit price display */}
          <div style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
            Unit price: PKR{unitPrice.toLocaleString()}.00 each
          </div>

          {customizationPrice > 0 && (
            <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>
              Includes PKR{customizationPrice} customization fee per item
            </p>
          )}

          {quantity > 1 && (
            <div
              style={{
                backgroundColor: "#e8f5e8",
                color: "#2d5f2d",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "8px",
                border: "1px solid #c3d9c3",
              }}
            >
              Total for {quantity} items: PKR{totalPrice.toLocaleString()}.00
            </div>
          )}
        </div>

        {/* Customization Toggle */}
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: isCustomizing ? "#FF6B6B" : "#f8f8f8",
              color: isCustomizing ? "white" : "#333",
              border: "none",
              padding: "10px 20px",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            <Palette size={16} />
            {isCustomizing ? "Hide Customization" : "Customize Product"}
          </button>
        </div>

        {/* Customization Options */}
        {isCustomizing && (
          <ChappalCustomizer
            size={selectedSize}
            product={product}
            // colorOptions={colorOptions}
            styleOptions={styleOptions}
            materialOptions={materialOptions}
            soleOptions={soleOptions}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedSole={selectedSole}
            setSelectedSole={setSelectedSole}
          />
        )}

        {/* Size Chart Link
        <div style={{ marginBottom: "20px" }}>
          <button
            style={{
              background: "none",
              border: "1px solid #ddd",
              padding: "8px 16px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <Ruler style={{ marginRight: "1rem" }} /> Size Chart
            </span>
          </button>
        </div> */}

        {/* Size Selector */}
        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Size: <span style={{ color: "#FF6B6B" }}>*</span>
          </h3>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: selectedSize ? "1px solid #ddd" : "2px solid #FF6B6B",
              borderRadius: "6px",
              fontSize: "16px",
              background: "white",
              color: "#000000",
            }}
          >
            <option value="">Choose an option</option>
            {product?.size?.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {!selectedSize && (
            <p
              style={{
                color: "#FF6B6B",
                fontSize: "12px",
                margin: "5px 0 0 0",
              }}
            >
              Please select a size
            </p>
          )}
        </div>

        {/* Quantity Selector */}
        <div style={{ marginBottom: "25px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Quantity
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#000000",
            }}
          >
            <button
              onClick={decrementQuantity}
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid #ddd",
                background: "white",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              -
            </button>
            <span
              style={{
                padding: "10px 20px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                minWidth: "60px",
                textAlign: "center",
              }}
            >
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid #ddd",
                background: "white",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
          <button
            style={{
              flex: "1",
              padding: "15px",
              background: selectedSize ? "#333" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: selectedSize ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
          >
            {/* <ShoppingCart size={18} /> */}
            <Link to="./CheckoutPage" style={{ color: "white" }}>
              CheckoutPage
            </Link>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!selectedSize}
            style={{
              flex: "1",
              padding: "15px",
              background: selectedSize ? "#FF6B6B" : "#ffb3b3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: selectedSize ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
            }}
          >
            Add to cart
          </button>
        </div>

        {/* Secondary Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
            padding: "15px",
            background: "#f8f8f8",
            borderRadius: "8px",
          }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              color: "#666",
            }}
          >
            <span style={{ fontSize: "18px" }}>
              <GitCompare />
            </span>
            <span>Compare</span>
          </button>

          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              color: "#666",
            }}
          >
            <HelpCircle size={18} />
            <span>Ask a Question</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              color: "#666",
            }}
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        {/* WhatsApp Order */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "15px",
            background: "#25D366",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <Phone style={{ marginRight: "1rem" }} /> Order Via WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
};

// Additional component for product details tabs
const ProductDetailsSection = () => {
  const [activeTab, setActiveTab] = useState("details");

  const customerReviews = [
    {
      name: "Zaheer Khan Burki",
      time: "a month ago",
      rating: 5,
      review:
        "I'm thrilled to receive my Peshawar Chappals parcel today! The product exceeds my expectations with its exceptional quality. Highly recommended!",
    },
    {
      name: "Bahawal Sher",
      time: "2 months ago",
      rating: 5,
      review:
        "Article is very soft and clean. Price is very reasonable. Highly recommend.",
    },
    {
      name: "Faisal Siddiqui",
      time: "3 months ago",
      rating: 5,
      review:
        "I ordered from uk with hesitation what will be the quality is price too high i am so pleased with excellent quality and service packing was excellent every detail was there i am highly impressed and recommend without any hesitation",
    },
    {
      name: "Muhammad Mushtaq",
      time: "4 months ago",
      rating: 5,
      review: "Good Quality, economical prices",
    },
    {
      name: "Yameen Khan",
      time: "4 months ago",
      rating: 5,
      review:
        "Sir mashallah very beautiful thing, this picture is very beautiful real ma mashallah my experience is very good, I am with you also inshallah on your website, I am very thankful to you for ordering it.",
    },
    {
      name: "Researchbuzz",
      time: "4 months ago",
      rating: 5,
      review:
        "I am fond of Peshawri Chappals for years, I have tried many brands and many designs but i have never seen such an amazing Chappals in my life. It is pure stunning art. normally when brands become popular they increase their profit, I reccommend Peshawri Chappals not to do so. Currently their Prices are low compare to their art and quality . Eid ul Fitar 2025....",
    },
  ];

  const products = [
    {
        _id: "689bf0328a4195b09de72b91",
        badge: "SIGNATURE",
        sales: true,
        percentage: "20",
        id: 1,
        status: "active",
        category: "Chappal",
        image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
        hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg",
        price: 69.99,
        name: "Mustard Smart Zalmi Chappal – 09274",
        quantity: 50,
        color: ["brown", "skin"],
        size: ["M", "L", "XL"],
        stock: 50,
        minStock: 10,
        supplier: "Peshawari Chappals Co.",
        description: "Premium mustard smart Zalmi chappal, crafted with high-quality leather and traditional design.",
        createdAt: "2025-08-13T01:53:54.902Z",
        updatedAt: "2025-08-13T01:53:54.902Z",
        __v: 0
    },
    {
        _id: "689bf0498a4195b09de72b93",
        id: 2,
        sales: true,
        percentage: "20",
        status: "active",
        category: "Chappal",
        image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
        hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/372-300x300.jpg",
        price: 69.99,
        name: "Black Smart Zalmi Chappal – 09275",
        quantity: 50,
        color: ["black", "brown"],
        size: ["L", "XL"],
        stock: 50,
        minStock: 10,
        supplier: "Peshawari Chappals Co.",
        description: "Elegant black smart Zalmi chappal with premium leather craftsmanship.",
        createdAt: "2025-08-13T01:54:17.709Z",
        updatedAt: "2025-08-13T01:54:17.709Z",
        __v: 0
    },
    {
        _id: "689bf07b8a4195b09de72b97",
        id: 4,
        status: "active",
        sales: false,
        percentage: "0",
        category: "Chappal",
        image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/12.1-300x300.jpg",
        hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/12.2-300x300.jpg",
        price: 64.99,
        name: "Black Round Shape Zalmi Chappal – 09294",
        quantity: 60,
        color: ["black"],
        size: ["L", "XL"],
        stock: 60,
        minStock: 10,
        supplier: "Peshawari Chappals Co.",
        description: "Classic black round shape Zalmi chappal with durable stitching and traditional look.",
        createdAt: "2025-08-13T01:55:07.730Z",
        updatedAt: "2025-08-13T01:55:07.730Z",
        __v: 0
    },
    {
        _id: "689c19af9a1826a8192abfc8",
        id: 19,
        name: "Completely Hand Stitched Iconic Black Kaptaan Chappal – 092170",
        price: 69.99,
        image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/Kaptaan-Chappal-092170-300x300.jpeg",
        hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/Kaptaan-Chappal-0921700-300x296.jpeg",
        status: "active",
        sales: false,
        category: "Chappal",
        quantity: 50,
        color: ["black"],
        size: ["M"],
        stock: 50,
        minStock: 10,
        supplier: "Peshawari Chappals Co.",
        description: "Completely hand stitched iconic black Kaptaan chappal, made with premium leather.",
        createdAt: "2025-08-13T05:12:15.000Z",
        updatedAt: "2025-08-13T05:12:15.000Z"
    },
    {
        _id: "689c1a339a1826a8192abfc9",
        id: 7,
        name: "Handmade Black Kaptaan Chappal – 092171",
        price: 69.99,
        image: "https://www.peshawarichappals.pk/wp-content/uploads/2021/12/kaptaan-chappal-min-1-jpg-300x300.webp",
        hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2021/12/8-2-300x300.jpg",
        status: "active",
        sales: false,
        category: "Chappal",
        quantity: 50,
        color: ["black"],
        size: ["M"],
        stock: 50,
        minStock: 10,
        supplier: "Peshawari Chappals Co.",
        description: "Handmade black Kaptaan chappal, crafted with care and tradition.",
        createdAt: "2025-08-13T05:14:27.000Z",
        updatedAt: "2025-08-13T05:14:27.000Z"
    },
    {
        _id: "689c1ad59a1826a8192abfcb",
        id: 9,
        name: "Handmade Black Brock Quetta Norozi Leather Chappal – 092235",
        price: 74.99,
        image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/norozi-chappal103-min-jpg-300x300.webp",
        hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/11/norozi-chappal110-min-jpg-300x300.webp",
        status: "active",
        sales: false,
        category: "Chappal",
        quantity: 50,
        color: ["black"],
        size: ["M"],
        stock: 50,
        minStock: 10,
        supplier: "Peshawari Chappals Co.",
        description: "Handmade black Brock Quetta Norozi leather chappal, durable and stylish.",
        createdAt: "2025-08-13T05:17:09.000Z",
        updatedAt: "2025-08-13T05:17:09.000Z"
    },
    {
        _id: "689c1aeb9a1826a8192abfcc",
        id: 17,
        name: "Hand Crafted Camel Suede Quetta Norozi Chappal With Single Sole – 092367",
        price: 64.99,
        image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/10/norozi-chappal157-300x300.jpeg",
        hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/10/norozi-chappal156-jpeg-300x300.webp",
        status: "active",
        sales: false,
        category: "Chappal",
        quantity: 50,
        color: ["brown"],
        size: ["M"],
        stock: 50,
        minStock: 10,
        supplier: "Peshawari Chappals Co.",
        description: "Hand crafted camel suede Quetta Norozi chappal with single sole, comfortable and light.",
        createdAt: "2025-08-13T05:17:31.000Z",
        updatedAt: "2025-08-13T05:17:31.000Z"
    }
];

  return (
    <div
      style={{ maxWidth: "1200px", margin: "40px auto 0", padding: "0 20px" }}
    >
      {/* Tabs Navigation */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #f0f0f0",
          marginBottom: "30px",
        }}
      >
        {[
          { key: "details", label: "Product Details" },
          { key: "shipping", label: "Shipping & Exchanges" },
          { key: "questions", label: "Questions" },
          { key: "reviews", label: "Customer Reviews" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "15px 25px",
              border: "none",
              background: "none",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "0px",
              cursor: "pointer",
              color: activeTab === tab.key ? "#FF6B6B" : "#666",
              borderBottom:
                activeTab === tab.key ? "3px solid #FF6B6B" : "none",
              transition: "all 0.3s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: "300px" }}>
        {/* Product Details Tab */}
        {activeTab === "details" && (
          <div style={{ lineHeight: "1.6", color: "#555" }}>
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>
              Feel the transformation of the old era with a modernistic touch
              with our Midnight Black Printed Leather Quetta Norozi Chappal. The
              textured leather goes hand in hand with the intricate designing
              and simple shape of this sturdy yet comfortable chappal made with
              the best materials available.
            </p>

            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#333",
              }}
            >
              Features:
            </h3>
            <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
              <li style={{ marginBottom: "8px" }}>Textured leather top</li>
              <li style={{ marginBottom: "8px" }}>
                Original Tyre Sole for durability and strength
              </li>
              <li style={{ marginBottom: "8px" }}>Adjustable Strap</li>
              <li style={{ marginBottom: "8px" }}>
                Metal buckle for good looks and better grip
              </li>
            </ul>

            <div
              style={{
                background: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
              }}
            >
              <p style={{ margin: "0", fontSize: "14px" }}>
                <strong>
                  Order now on our website or Call/WhatsApp us at:
                </strong>{" "}
                <span style={{ color: "#25D366", fontWeight: "bold" }}>
                  +92333 574 2086
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Shipping & Exchanges Tab */}
        {activeTab === "shipping" && (
          <div style={{ lineHeight: "1.6", color: "#555" }}>
            <div style={{ marginBottom: "30px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  color: "#333",
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <Truck style={{ marginRight: "1rem" }} /> Shipping
                </span>
              </h3>
              <p style={{ marginBottom: "10px" }}>
                <strong>Expected Delivery Time:</strong> 3-5 business days.
                Please note that delivery times may vary depending on your
                location.
              </p>
              <p style={{ fontSize: "14px", color: "#666" }}>
                For full shipping terms, please see our shipping policy.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  color: "#333",
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ChartCandlestick style={{ marginRight: "1rem" }} />{" "}
                  Hassle-Free Exchanges
                </span>
              </h3>
              <p>
                Enjoy a seamless return and exchange process with Peshawari
                Chappals Pakistan - your satisfaction is our priority, making
                hassle-free returns and exchanges a breeze!
              </p>
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>❓</div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#333",
              }}
            >
              Question & Answer
            </h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>0 Questions</p>
            <p
              style={{ color: "#999", fontSize: "14px", marginBottom: "30px" }}
            >
              There are no questions found.
            </p>

            <button
              style={{
                background: "#FF6B6B",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "25px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Ask a Question
            </button>
          </div>
        )}

        {/* Customer Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            {/* Reviews Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "30px",
                padding: "20px",
                background: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "0",
                    color: "#333",
                  }}
                >
                  What Our Customers Say
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#FF6B6B",
                    }}
                  >
                    4.6
                  </span>
                  <div style={{ display: "flex" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        style={{
                          color: i < 4 ? "#FFD700" : "#ddd",
                          fill: i < 4 ? "#FFD700" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    Based on 311 reviews
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#999",
                    margin: "5px 0 0 0",
                  }}
                >
                  powered by Google
                </p>
              </div>
            </div>

            {/* Reviews List */}
            <div style={{ display: "grid", gap: "20px" }}>
              {customerReviews.map((review, index) => (
                <div
                  key={index}
                  style={{
                    padding: "20px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    background: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          margin: "0",
                          color: "#333",
                        }}
                      >
                        {review.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#666",
                          margin: "5px 0 0 0",
                        }}
                      >
                        {review.time}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          style={{
                            color: i < review.rating ? "#FFD700" : "#ddd",
                            fill: i < review.rating ? "#FFD700" : "none",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p style={{ color: "#555", lineHeight: "1.5", margin: "0" }}>
                    {review.review}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                style={{
                  background: "none",
                  border: "2px solid #FF6B6B",
                  color: "#FF6B6B",
                  padding: "12px 24px",
                  borderRadius: "25px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                More reviews
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      <div
        style={{
          marginTop: "60px",
          paddingTop: "40px",
          borderTop: "2px solid #f0f0f0",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "30px",
            color: "#333",
            textAlign: "center",
          }}
        >
          Related Products
        </h2>

        <section className="bg-gray-50 py-[60px] lg:py-[50px] xl:py-[50px] 2xl:py-[50px] md:py-10 sm:py-[30px] xs:py-[25px]">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-5 xl:px-5 2xl:px-5 md:px-[15px] sm:px-[10px] xs:px-[10px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-[30px] lg:gap-[30px] xl:gap-[30px] 2xl:gap-[30px] mb-[50px] md:gap-5 sm:gap-[15px] xs:gap-[15px]">
              {products.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Main Product Component that includes both product info and details
const MainProductPage = () => {
  return (
    <div>
      <ProductInfo />
      <ProductDetailsSection />
    </div>
  );
};

export default MainProductPage;
