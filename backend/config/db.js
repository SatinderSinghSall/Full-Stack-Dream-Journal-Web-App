const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB database connected.");
  } catch (error) {
    console.error("❌ MongoDB database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
