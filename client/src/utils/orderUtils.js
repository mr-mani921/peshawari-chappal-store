import API from "./api";
import { Danger, Success } from "./Tostify";

// Utility function to process order items for backend
export const processOrderItems = (cartItems, customOrder = null) => {
  let orderItems = [...cartItems];

  // Add custom order if exists
  if (customOrder && Object.keys(customOrder).length > 0) {
    const customOrderItem = {
      id: customOrder.id || "custom-" + Date.now(),
      name: customOrder.name || "Custom Chappal",
      price: customOrder.price || 6500,
      image:
        customOrder.image ||
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop",
      quantity: 1,
      size: customOrder.size || "M",
      color: customOrder.color || "mustard",
      style: customOrder.style || "classic",
      material: customOrder.material || "leather",
      sole: customOrder.sole || "rubber",
      customizations: customOrder.customizations || {},
      customizationPrice: customOrder.customizationPrice || 0,
      basePrice: customOrder.basePrice || 6500,
      originalPrice: customOrder.originalPrice || 10500,
      rating: customOrder.rating || 4.8,
      reviewCount: customOrder.reviewCount || 2847,
      cartId: `custom-${Date.now()}`,
    };
    orderItems.push(customOrderItem);
  }

  return orderItems;
};

// Utility function to calculate order total
export const calculateOrderTotal = (cartItems, customOrder = null) => {
  let total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (customOrder && Object.keys(customOrder).length > 0) {
    total += customOrder.price || 6500;
  }

  return total;
};

// Utility function to submit order
export const submitOrder = async (orderData) => {
  try {
    const response = await API.post("/orders/add", orderData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Order submission error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to place order",
    };
  }
};

// Utility function to validate order data
export const validateOrderData = (customerInfo, items, customOrder = null) => {
  const errors = [];

  // Validate customer info
  if (!customerInfo.fullName?.trim()) {
    errors.push("Full name is required");
  }
  if (!customerInfo.phone?.trim()) {
    errors.push("Phone number is required");
  }
  if (!customerInfo.townCity?.trim()) {
    errors.push("Town/City is required");
  }
  if (!customerInfo.streetAddress?.trim()) {
    errors.push("Street address is required");
  }

  // Validate items
  if (items.length === 0 && !customOrder) {
    errors.push("Please add items to cart before placing an order");
  }

  return errors;
};

// Utility function to format customization details for display
export const formatCustomizations = (item) => {
  const customizations = [];

  if (item.size) customizations.push(`Size: ${item.size}`);
  if (item.color)
    customizations.push(
      `Color: ${item.color.charAt(0).toUpperCase() + item.color.slice(1)}`
    );
  if (item.style && item.style !== "classic") {
    customizations.push(
      `Style: ${item.customizations?.style?.label || item.style}`
    );
  }
  if (item.material && item.material !== "leather") {
    customizations.push(
      `Material: ${item.customizations?.material?.label || item.material}`
    );
  }
  if (item.sole && item.sole !== "rubber") {
    customizations.push(
      `Sole: ${item.customizations?.sole?.label || item.sole}`
    );
  }

  return customizations;
};

// Utility function to create product object for cart
export const createProductObject = (product, customizations = {}) => {
  const {
    selectedColor = "mustard",
    selectedStyle = "classic",
    selectedMaterial = "leather",
    selectedSole = "rubber",
    selectedSize = "M",
    quantity = 1,
  } = customizations;

  const basePrice = 6500;
  const customizationPrice = calculateCustomizationPrice(customizations);
  const unitPrice = basePrice + customizationPrice;

  return {
    id: product?.id || "09274",
    name: `${
      selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
    } Smart Zalmi Chappal — ${product?.id || "09274"}`,
    price: unitPrice,
    originalPrice: 10500,
    image:
      product?.image ||
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop",
    size: selectedSize,
    color: selectedColor,
    style: selectedStyle,
    material: selectedMaterial,
    sole: selectedSole,
    customizations: {
      color: {
        name: selectedColor,
        label: selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1),
        price: 0,
      },
      style: {
        name: selectedStyle,
        label: selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1),
        price: 0,
      },
      material: {
        name: selectedMaterial,
        label:
          selectedMaterial.charAt(0).toUpperCase() + selectedMaterial.slice(1),
        price: 0,
      },
      sole: {
        name: selectedSole,
        label: selectedSole.charAt(0).toUpperCase() + selectedSole.slice(1),
        price: 0,
      },
    },
    customizationPrice,
    basePrice,
    rating: 4.8,
    reviewCount: 2847,
    quantity,
  };
};

// Utility function to calculate customization price
export const calculateCustomizationPrice = (customizations) => {
  let total = 0;

  const colorPrices = {
    mustard: 0,
    brown: 0,
    black: 200,
    tan: 150,
    maroon: 300,
  };

  const stylePrices = {
    classic: 0,
    modern: 500,
    embroidered: 1200,
    beaded: 800,
  };

  const materialPrices = {
    leather: 0,
    suede: 700,
    canvas: -500,
    velvet: 1000,
  };

  const solePrices = {
    rubber: 0,
    leather: 400,
    cushioned: 600,
    "anti-slip": 350,
  };

  if (customizations.selectedColor) {
    total += colorPrices[customizations.selectedColor] || 0;
  }
  if (customizations.selectedStyle) {
    total += stylePrices[customizations.selectedStyle] || 0;
  }
  if (customizations.selectedMaterial) {
    total += materialPrices[customizations.selectedMaterial] || 0;
  }
  if (customizations.selectedSole) {
    total += solePrices[customizations.selectedSole] || 0;
  }

  return total;
};



