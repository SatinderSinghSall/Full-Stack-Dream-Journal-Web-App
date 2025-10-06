const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

// Load environment variables
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

//! To run the backend for DEVELOPMENT -> npm run dev
//! To run the backend for PRODUCTION -> npm start

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// User Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/dreams", require("./routes/dreams"));
app.use("/api/user", require("./routes/user"));

// Admin Routes
app.use("/api/admin", require("./routes/admin"));

app.use("/", (req, res) => {
  res.send("Server's / Backend API is running & LIVE...🚀");
});

// DB connection
connectDB();

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
