const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

/**
 * 🔒 Middleware for normal user authentication
 * Verifies JWT and attaches user payload to req.user
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

/**
 * 🛡️ Middleware for admin authentication
 * Verifies JWT, ensures it belongs to an admin
 */
const adminAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify that the token belongs to a valid Admin
    const admin = await Admin.findById(decoded.id);
    if (!admin)
      return res.status(403).json({ message: "Access denied. Not an admin." });

    req.admin = admin; // attach admin info
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  authMiddleware,
  adminAuthMiddleware,
};
