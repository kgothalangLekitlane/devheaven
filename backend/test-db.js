const mongoose = require("mongoose");
require("dotenv").config();

async function testConnection() {
  try {
    console.log("Testing MongoDB connection...");
    console.log("MongoDB URI:", process.env.MONGO_URI ? "Set" : "Not set");
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log("✅ MongoDB connected successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

testConnection();
