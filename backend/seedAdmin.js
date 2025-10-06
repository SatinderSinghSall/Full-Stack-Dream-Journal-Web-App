const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");
const connectDB = require("./config/db");

dotenv.config({ path: ".env.development" });

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: "satindersinghsall111@gmail.com",
    });
    if (existingAdmin) {
      console.log("Admin already exists 👑");
      return process.exit();
    }

    const admin = new Admin({
      name: "Satinder Singh Sall",
      email: "satindersinghsall111@gmail.com",
      password: "SatinderAdmin@123",
      superAdmin: true,
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
