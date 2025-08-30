import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../utils/api";
import { useProducts } from "../pages/Contexts/Product";
import { Danger, Success } from "../utils/Tostify";
import { Loader } from "lucide-react";

const AddProduct = () => {
  const { setProducts } = useProducts();

  const [formData, setFormData] = useState({
    id: "",
    status: "active",
    sales:false,
    percentage:'',
    category: "",
    image: "",
    hoverImage: "",
    price: "",
    badge: "",
    name: "",
    quantity: "",
    color: [],  
    size: [], 
    minStock: "",
    supplier: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // Auto-set stock equal to quantity initially
  useEffect(() => {
    if (formData.quantity && !formData.stock) {
      setFormData((prev) => ({
        ...prev,
        stock: prev.quantity,
      }));
    }
  }, [formData.quantity]);


    const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, [field]: [...prev[field], value] };
      } else {
        return { ...prev, [field]: prev[field].filter((item) => item !== value) };
      }
    });
  };

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => {
    // Special handling for badge checkbox
    if (name === "badge") {
      return { ...prev, badge: checked ? "SIGNATURE" : "" };
    }

    // Special handling for sales checkbox
    if (name === "sales") {
      return { ...prev, sales: checked, percentage: checked ? prev.percentage : "" };
    }

    // Number fields
    if (["price", "quantity", "id", "stock", "minStock", "percentage"].includes(name)) {
      return { ...prev, [name]: value ? Number(value) : "" };
    }

    // Default for text fields
    return { ...prev, [name]: value };
  });
};


  const handleImageUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        uploadData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (type === "first") {
        setFormData((prev) => ({ ...prev, image: res.data.secure_url }));
      } else {
        setFormData((prev) => ({ ...prev, hoverImage: res.data.secure_url }));
      }
      setLoading(false);
    } catch (err) {
      console.error("Image upload error", err.response?.data || err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products/add", formData);
      setProducts((prev) => [...prev, formData]);
      console.log("Product added successfully", formData);
      Success("Product added successfully!");
      setFormData({
        id: "",
        status: "active",
        category: "",
        sales:false,
        percentage:"",
        image: "",
        hoverImage: "",
        price: "",
        badge: "",
        name: "",
        quantity: "",
        color: "",
        size: [],
        stock: [],
        minStock: "",
        supplier: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding product", err);
      Danger("Error adding product");

    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 text-black">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Row - ID & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="id"
            placeholder="Product ID"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            min={1}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            min={1}
            required
            className="w-full border p-2 rounded"
          />
        </div>

         <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="">
  <p className="font-semibold">Colors:</p>
  {["black", "brown", "skin"].map((color) => (
    <label key={color} className="flex  space-x-1">
      <input
        type="checkbox"
        value={color}
        checked={formData.color.includes(color)}
        onChange={(e) => handleCheckboxChange(e, "color")}
      />
      <span>{color}</span>
    </label>
  ))}
</div>

{/* Size Checkboxes */}
<div className=" ">
  <p className="font-semibold">Sizes:</p>
  {["S", "M", "L", "XL", "XXL"].map((size) => (
    <label key={size} className="flex items-center space-x-2">
      <input
        type="checkbox"
        value={size}
        checked={formData.size.includes(size)}
        onChange={(e) => handleCheckboxChange(e, "size")}
      />
      <span>{size}</span>
    </label>
  ))}
</div>

</div>


        {/* Stock & Min Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            min={1}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="minStock"
            placeholder="Minimum Stock"
            value={formData.minStock}
            onChange={handleChange}
            min={10}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Supplier & Name */}
        <input
          type="text"
          name="supplier"
          placeholder="Supplier Name"
          value={formData.supplier}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name (optional)"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
       {formData.sales && (
  <input
    type="number"
    name="percentage"
    placeholder="Percentage %"
    value={formData.percentage}
    onChange={handleChange}
    min={1}
    max={100}
    required
    className="w-full border p-2 rounded"
  />
)}

        {/* Badge Checkbox */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="badge"
            checked={formData.badge === "SIGNATURE"}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span>Approved Signature Badge</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="sales"
            checked={formData.sales === true}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span>If you want to set sales</span>
          
        </label>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        ></textarea>

        {/* Image Upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "first")}
            required
          />
          {/* {loading && <p className="text-red-500">Uploading image...</p>} */}
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-3 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Hover Image Upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "second")}
            required
          />
          {loading && <p className="text-red-500 flex justify-center"><Loader/></p>}
          {formData.hoverImage && (
            <img
              src={formData.hoverImage}
              alt="Preview"
              className="mt-3 h-32 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={!formData.image || loading}
          className={`w-full py-2 rounded transition ${
            !formData.image || loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
