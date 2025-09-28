import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save dream");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          New Dream Entry
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter a title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
              errors.title
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            placeholder="Describe your dream..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:outline-none ${
              errors.description
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
              errors.date
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g., Lucid, Nightmare, Recurring"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Mood
            </label>
            <select
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm"
            >
              <option value="Neutral">Neutral</option>
              <option value="Happy">Happy</option>
              <option value="Scary">Scary</option>
              <option value="Sad">Sad</option>
              <option value="Exciting">Exciting</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Vividness (1-5)
            </label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.rating
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-purple-400"
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
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}
            className="w-1/2 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg shadow hover:bg-gray-300 transition disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 flex items-center justify-center gap-2 bg-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Dream"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
