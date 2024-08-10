import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
dotenv.config();
const app = express();
app.use(express.json()); // allows us to accept JSON data in the req.body

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

app.listen(5000, () => {
  connectDB();
  console.log("Server has started");
});
