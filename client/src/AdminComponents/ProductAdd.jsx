import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../utils/api";
import { useProducts } from "../pages/Contexts/Product";

const AddProduct = () => {
 const {setProducts}=useProducts()

  const [formData, setFormData] = useState({
    id: "",
    status: "active",
    category: "",
    image: "",
    price: "",
    name: "",
    quantity: "",
    color: "",
    size: "",
    stock: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "quantity" ||
        name === "id" ||
        name === "stock" ||
        name === "minStock"
          ? value
            ? Number(value)
            : ""
          : value,
    }));
  };

  const handleImageUpload = async (e) => {
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
      setFormData((prev) => ({ ...prev, image: res.data.secure_url }));
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
      alert("Product added successfully!");
      setFormData({
        id: "",
        status: "active",
        category: "",
        image: "",
        price: "",
        name: "",
        quantity: "",
        color: "",
        size: "",
        stock: "",
        minStock: "",
        supplier: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="id" placeholder="Product ID" value={formData.id} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} min={1} required className="w-full border p-2 rounded" />
        <input type="text" name="name" placeholder="Product Name (optional)" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} min={1} required className="w-full border p-2 rounded" />
        <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="text" name="size" placeholder="Size" value={formData.size} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} min={1} required className="w-full border p-2 rounded" />
        <input type="number" name="minStock" placeholder="Minimum Stock" value={formData.minStock} onChange={handleChange} min={10} required className="w-full border p-2 rounded" />
        <input type="text" name="supplier" placeholder="Supplier Name" value={formData.supplier} onChange={handleChange} required className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded"></textarea>

        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
          {loading && <p className="text-red-500 border">Uploading image...</p>}
          {formData.image && <img src={formData.image} alt="Preview" className="mt-3 h-32 object-cover rounded" />}
        </div>

        <button type="submit" disabled={!formData.image || loading} className={`w-full py-2 rounded transition ${!formData.image || loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} border`}>
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
