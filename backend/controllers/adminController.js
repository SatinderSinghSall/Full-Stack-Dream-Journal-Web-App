const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Dream = require("../models/Dream");

// Generate JWT for admin
const generateToken = (id) => {
  return jwt.sign({ id, type: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(admin._id);
    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        superAdmin: admin.superAdmin,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new admin
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, superAdmin } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Admin already exists" });

    const admin = new Admin({ name, email, password, superAdmin });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const dreams = await Dream.countDocuments();
    res.json({ users, dreams }); // frontend-friendly keys
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all dreams
exports.getAllDreams = async (req, res) => {
  try {
    const dreams = await Dream.find()
      .populate({ path: "user", select: "name email", strictPopulate: false })
      .lean();

    const formattedDreams = dreams.map((dream) => ({
      _id: dream._id,
      title: dream.title,
      content: dream.content,
      dateOfDream: dream.dateOfDream,
      tags: dream.tags || [],
      mood: dream.mood,
      rating: dream.rating,
      user: dream.user
        ? { name: dream.user.name, email: dream.user.email }
        : { name: "Unknown", email: "" },
    }));

    res.json(formattedDreams);
  } catch (error) {
    console.error("Get dreams error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
