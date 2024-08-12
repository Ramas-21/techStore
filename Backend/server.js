import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
dotenv.config();
const app = express();
app.use(express.json()); // allows us to accept JSON data in the req.body

app.get("/api/products", async (req,res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products});
  } catch (error) {
    console.log("Error in fetching products:", error.message)
    res.status(500).json({ success: false, message: "Server error"})
  }
})

app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all the fields" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error failed to create product:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

app.delete('/api/products/:id', async (req,res) => {
  const {id} = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message:"product deleted" })
  } catch (error) {
    res.status(404).json({ success: false, message: "product not found"})
  }
})

app.listen(5000, () => {
  connectDB();
  console.log("Server has started");
});
