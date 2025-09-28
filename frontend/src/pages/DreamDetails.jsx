import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function DreamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dream, setDream] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch dream details
  useEffect(() => {
    const fetchDream = async () => {
      try {
        const res = await api.get(`/dreams/${id}`);
        setDream(res.data);

        setForm({
          title: res.data.title || "",
          description: res.data.content || "",
          date: res.data.dateOfDream ? res.data.dateOfDream.slice(0, 10) : "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDream();
  }, [id]);

  // Delete dream
  const handleDelete = async () => {
    if (window.confirm("Delete this dream?")) {
      try {
        await api.delete(`/dreams/${id}`);
        navigate("/dashboard");
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  // Update dream
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await api.put(`/dreams/${id}`, {
        title: form.title,
        content: form.description,
        dateOfDream: form.date,
      });
      setDream(res.data);
      setEditMode(false);
    } catch (err) {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  if (!dream) {
    return <p className="text-center text-gray-600 mt-10">Dream not found.</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 p-4">
      <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-4">
        {!editMode ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {dream.title}
            </h2>
            <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base">
              {dream.content}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              <b>Date:</b>{" "}
              {dream.dateOfDream
                ? new Date(dream.dateOfDream).toLocaleDateString()
                : "No date"}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="flex-1 bg-purple-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-purple-600 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg shadow hover:bg-gray-300 transition"
              >
                Back
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
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
                  "Save"
                )}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg shadow hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
