const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 22111;

mongoose.connect("mongodb://localhost:27017/productsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model("Product", {
  name: String,
  description: String,
  image_url: String,
  discount_percent: String,
  weight: String,
  rating: Number,
  sku: String,
  original_price: String,
  final_price: String,
  stock: String,
  type: String,
  mfg: String,
  life: String,
  category: String,
});

app.use(cors());
app.use(express.json());

// Get all products
app.get("/api", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Save new product
app.post("/api", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
