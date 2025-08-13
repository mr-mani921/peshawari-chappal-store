import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const {
      id,
      status,
      category,
      image,
      sales,
      percentage,
      hoverImage,
      price,
      badge,
      name,
      quantity,
      color,
      size,
      stock,
      minStock,
      supplier,
      description
    } = req.body;

    // Basic validation
    if (!id || !category || !image || !hoverImage || !price || !quantity || !color || !size || !stock || !minStock || !supplier || !description) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newProduct = new Product({
      id,
      status: status || "active",
      sales,
      category,
      image,
      hoverImage,
      badge,
      price,
      percentage,
      name: name || null,
      quantity,
      color,
      size,
      stock,
      minStock,
      supplier,
      description
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Product (Any field can be updated)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Product ID from URL
    const updates = req.body; // Fields to update

    const updatedProduct = await Product.findOneAndUpdate(
      { id }, // Find by custom `id` field
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({updateproduct:updatedProduct,mesaage: "Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error from server",error:err });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is provided
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const idNumber= Number(id);
    // Find and delete the product
    const deletedProduct = await Product.findOneAndDelete({ id: idNumber });

    // If product not found
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

