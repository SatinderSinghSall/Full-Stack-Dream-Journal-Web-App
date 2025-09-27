const mongoose = require("mongoose");

const DreamSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "Untitled" },
    content: { type: String, required: true },
    dateOfDream: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dream", DreamSchema);
