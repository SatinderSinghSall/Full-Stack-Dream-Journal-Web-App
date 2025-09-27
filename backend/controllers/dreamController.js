const Dream = require("../models/Dream");

// Create Dream
exports.createDream = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const dream = await Dream.create({
      user: req.user.id,
      title,
      content: description,
      dateOfDream: date,
    });

    res.status(201).json(dream);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all dreams for user
exports.getDreams = async (req, res) => {
  try {
    const dreams = await Dream.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(dreams);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single dream
exports.getDream = async (req, res) => {
  try {
    const dream = await Dream.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!dream) return res.status(404).json({ message: "Dream not found" });
    res.json(dream);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update dream
exports.updateDream = async (req, res) => {
  try {
    let dream = await Dream.findOne({ _id: req.params.id, user: req.user.id });
    if (!dream) return res.status(404).json({ message: "Dream not found" });

    dream = await Dream.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(dream);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete dream
exports.deleteDream = async (req, res) => {
  try {
    const dream = await Dream.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!dream) return res.status(404).json({ message: "Dream not found" });
    res.json({ message: "Dream deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
