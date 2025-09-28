const Dream = require("../models/Dream");

// Helper: normalize tags (string or array) -> array
const normalizeTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags))
    return tags.map((t) => String(t).trim()).filter(Boolean);
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
};

const ALLOWED_MOODS = ["Happy", "Scary", "Sad", "Exciting", "Neutral"];

// Create Dream
exports.createDream = async (req, res) => {
  try {
    const { title, description, date, tags, mood, rating } = req.body;

    const tagsArray = normalizeTags(tags);
    const moodValue = ALLOWED_MOODS.includes(mood) ? mood : "Neutral";

    let ratingValue = undefined;
    if (rating !== undefined && rating !== null && rating !== "") {
      const r = Number(rating);
      if (!Number.isNaN(r) && r >= 1 && r <= 5) ratingValue = r;
    }

    const dream = await Dream.create({
      user: req.user.id,
      title,
      content: description, // frontend uses description; DB uses content
      dateOfDream: date,
      tags: tagsArray,
      mood: moodValue,
      rating: ratingValue,
    });

    res.status(201).json(dream);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update dream
exports.updateDream = async (req, res) => {
  try {
    // Build safe update object
    const {
      title,
      description,
      content,
      date,
      dateOfDream,
      tags,
      mood,
      rating,
    } = req.body;

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    // accept either description (frontend) or content (backend)
    if (description !== undefined) updateData.content = description;
    else if (content !== undefined) updateData.content = content;

    if (date !== undefined) updateData.dateOfDream = date;
    else if (dateOfDream !== undefined) updateData.dateOfDream = dateOfDream;

    if (tags !== undefined) updateData.tags = normalizeTags(tags);

    if (mood !== undefined) {
      updateData.mood = ALLOWED_MOODS.includes(mood) ? mood : undefined;
    }

    if (rating !== undefined && rating !== null && rating !== "") {
      const r = Number(rating);
      if (!Number.isNaN(r) && r >= 1 && r <= 5) updateData.rating = r;
    }

    const dream = await Dream.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: updateData },
      { new: true }
    );

    if (!dream) return res.status(404).json({ message: "Dream not found" });
    res.json(dream);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
