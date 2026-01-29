import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

// Connect DB
await mongoose.connect(process.env.MONGO_URI);

// Clear existing data
await Product.deleteMany();
await User.deleteMany();

// Create Admin User
const adminUser = await User.create({
  name: "Admin",
  email: "admin@test.com",
  password: "admin123",
  isAdmin: true
});

// Sample Products
const products = [
  // Electronics
  { name: "Smartphone", price: 15000, category: "Electronics", image: "https://via.placeholder.com/150", countInStock: 10 },
  { name: "Laptop", price: 55000, category: "Electronics", image: "https://via.placeholder.com/150", countInStock: 5 },
  { name: "Headphones", price: 2000, category: "Electronics", image: "https://via.placeholder.com/150", countInStock: 15 },
  { name: "Smart Watch", price: 5000, category: "Electronics", image: "https://via.placeholder.com/150", countInStock: 8 },

  // Clothing
  { name: "T-Shirt", price: 500, category: "Clothing", image: "https://via.placeholder.com/150", countInStock: 20 },
  { name: "Jeans", price: 1200, category: "Clothing", image: "https://via.placeholder.com/150", countInStock: 12 },
  { name: "Jacket", price: 2500, category: "Clothing", image: "https://via.placeholder.com/150", countInStock: 7 },
  { name: "Shoes", price: 3000, category: "Clothing", image: "https://via.placeholder.com/150", countInStock: 10 },

  // Books
  { name: "JavaScript Book", price: 700, category: "Books", image: "https://via.placeholder.com/150", countInStock: 30 },
  { name: "Python Book", price: 800, category: "Books", image: "https://via.placeholder.com/150", countInStock: 25 },
  { name: "Data Science Book", price: 900, category: "Books", image: "https://via.placeholder.com/150", countInStock: 18 },
  { name: "React Guide", price: 650, category: "Books", image: "https://via.placeholder.com/150", countInStock: 22 },

  // Accessories
  { name: "Backpack", price: 1800, category: "Accessories", image: "https://via.placeholder.com/150", countInStock: 14 },
  { name: "Wallet", price: 700, category: "Accessories", image: "https://via.placeholder.com/150", countInStock: 20 },
  { name: "Sunglasses", price: 1200, category: "Accessories", image: "https://via.placeholder.com/150", countInStock: 9 },
  { name: "Cap", price: 400, category: "Accessories", image: "https://via.placeholder.com/150", countInStock: 25 },

  // Extra products (to make 20)
  { name: "Bluetooth Speaker", price: 2500, category: "Electronics", image: "https://via.placeholder.com/150", countInStock: 11 },
  { name: "Hoodie", price: 2000, category: "Clothing", image: "https://via.placeholder.com/150", countInStock: 13 },
  { name: "Notebook", price: 150, category: "Books", image: "https://via.placeholder.com/150", countInStock: 40 },
  { name: "Keychain", price: 100, category: "Accessories", image: "https://via.placeholder.com/150", countInStock: 50 }
];

// Insert Products
await Product.insertMany(products);

console.log("✅ Database Seeded Successfully");
console.log("👤 Admin Login:");
console.log("Email: admin@test.com");
console.log("Password: admin123");

process.exit();
