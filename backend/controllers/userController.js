const User = require("../models/User");

// @desc Get logged-in user's profile
// @route GET /api/user/profile
// @access Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update user profile
// @route PUT /api/user/profile
// @access Private
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();
    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findUserByEmail = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase(); // match lowercase in DB
    const user = await User.findOne({ email }).select("_id name email");

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with this email." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Find user by email error:", err);
    res.status(500).json({ message: "Server error." });
  }
};
