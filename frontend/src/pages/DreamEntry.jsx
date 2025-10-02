import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";

import api from "../api/api";

export default function DreamEntry() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    tags: "",
    mood: "Neutral",
    rating: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (form.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (!form.date) {
      newErrors.date = "Date is required.";
    } else if (new Date(form.date) > new Date()) {
      newErrors.date = "Date cannot be in the future.";
    }

    if (form.rating) {
      const r = Number(form.rating);
      if (Number.isNaN(r) || r < 1 || r > 5)
        newErrors.rating = "Rating must be 1 to 5.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const tagsArray = form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      const payload = {
        title: form.title,
        description: form.description,
        date: form.date,
        tags: tagsArray,
        mood: form.mood,
        rating: form.rating ? Number(form.rating) : undefined,
      };

      await api.post("/dreams", payload);
      toast.success("Dream saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save dream.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-pink-200 to-purple-200 relative overflow-hidden px-4">
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl mt-10 mb-10 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] rounded-3xl p-8 space-y-6 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide drop-shadow-sm">
          🌙 New Dream Entry
        </h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter a title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:outline-none transition ${
              errors.title
                ? "border-red-300 focus:ring-red-200 bg-red-50/50"
                : "border-transparent focus:ring-purple-300 bg-white/70"
            }`}
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Description
          </label>

          <div className="relative">
            <textarea
              placeholder="Describe your dream..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={4}
              className={`w-full px-4 py-3 rounded-2xl resize-none border shadow-sm transition duration-200 placeholder-gray-400 focus:outline-none ${
                errors.description
                  ? "border-red-300 focus:ring-2 focus:ring-red-200 bg-red-50/60"
                  : "border-gray-200 focus:ring-2 focus:ring-purple-300 bg-white/80"
              }`}
            />
            {/* Glow border effect on focus */}
            <span className="absolute inset-0 rounded-2xl pointer-events-none ring-0 focus-within:ring-2 focus-within:ring-purple-200 transition"></span>
          </div>

          {errors.description && (
            <p className="text-red-500 text-xs font-medium">
              {errors.description}
            </p>
          )}

          {/* Show full text option */}
          {form.description && (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              See full description
            </button>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:outline-none transition ${
              errors.date
                ? "border-red-300 focus:ring-red-200 bg-red-50/50"
                : "border-transparent focus:ring-purple-300 bg-white/70"
            }`}
          />
          {errors.date && (
            <p className="text-red-400 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g., Lucid, Nightmare, Recurring"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-transparent bg-white/70 focus:ring-2 focus:ring-purple-300 focus:outline-none text-sm"
          />
        </div>

        {/* Mood + Rating */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mood
            </label>
            <select
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-transparent bg-white/70 focus:ring-2 focus:ring-purple-300 focus:outline-none text-sm"
            >
              <option value="Neutral">Neutral</option>
              <option value="Happy">Happy</option>
              <option value="Scary">Scary</option>
              <option value="Sad">Sad</option>
              <option value="Exciting">Exciting</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vividness (1-5)
            </label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className={`w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:outline-none transition ${
                errors.rating
                  ? "border-red-300 focus:ring-red-200 bg-red-50/50"
                  : "border-transparent focus:ring-purple-300 bg-white/70"
              }`}
            >
              <option value="">Not set</option>
              <option value="1">1 - Faint</option>
              <option value="2">2</option>
              <option value="3">3 - Average</option>
              <option value="4">4</option>
              <option value="5">5 - Very vivid</option>
            </select>
            {errors.rating && (
              <p className="text-red-400 text-sm mt-1">{errors.rating}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}
            className="w-1/2 py-3 rounded-2xl bg-white/70 text-gray-700 font-semibold shadow hover:bg-white/90 transition disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </>
            ) : (
              "Save Dream"
            )}
          </button>
        </div>
      </form>

      {/* Modal to display & edit dream description */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Dream Description
            </h3>

            {/* Editable Textarea */}
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={12}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:outline-none resize-none"
              placeholder="Edit your dream description here..."
            />

            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
