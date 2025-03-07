import Product from "../models/Product";
import { Request, Response } from "express";

// CREATE a new product

export async function addProduct(req: Request, res: Response): Promise<void>{
  try {
    console.log("📩 Received product data:", req.body); // Log request data
    const { name, description, price, sku, category, stocks, status, warehouse } = req.body;

    // Check for required fields
    if (!name || !description || !price || !sku || !category || !warehouse) {
      res.status(400).json({ message: "All fields (name, description, price, sku, category) are required!" });
    }

    const product = new Product({
      name,
      description,
      price,
      sku,
      category,
      stocks: stocks || 0, // Default to 0 if not provided
      status: status || "instock", // Default status
      warehouse,
    });

    await product.save();
    console.log("✅ Product added:", product);
    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    console.log("Erro is addProduct:",error);
    res.status(500).json({ message: "Error adding product", error });
  }
};


// READ all products
export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const products = await Product.find().populate("warehouse", "name");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}

// READ a single product by ID
export async function getProductById(req: Request, res: Response): Promise<void> {
  try {
    const product = await Product.findById(req.params.id).populate("warehouse", "name");
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}

// UPDATE a product by ID
export async function updateProduct(req: Request, res: Response): Promise<void> {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });

    if (!updatedProduct) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
}

// DELETE a product by ID
export async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}
