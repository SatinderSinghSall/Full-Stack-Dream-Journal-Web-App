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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  // Delete dream
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/dreams/${id}`);
      navigate("/dashboard");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 p-4">
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="flex gap-3 mt-4">
            <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!dream) {
    return <p className="text-center text-gray-600 mt-10">Dream not found.</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 p-4">
      <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-4 relative">
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
                onClick={() => setDeleteModalOpen(true)}
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

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save"}
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

        {/* Delete Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-6 shadow-xl animate-scale-fade">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 rounded-full p-5 mb-4 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Delete Dream
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Are you sure you want to delete this dream? This action cannot
                  be undone.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-2 rounded-xl shadow hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Delete
                    </>
                  )}
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-xl shadow hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes scaleFade {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scale-fade {
            animation: scaleFade 0.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
