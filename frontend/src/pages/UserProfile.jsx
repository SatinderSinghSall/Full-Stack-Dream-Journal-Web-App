import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  Mail,
  CalendarDays,
  Save,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await updateUserProfile(formData);
      setUser(res.data.user);
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-white text-gray-500 text-lg">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-white flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 text-gray-600 hover:text-indigo-600 transition flex items-center gap-1"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex flex-col items-center text-center mt-6">
          <div className="relative">
            <img
              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}`}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md ring-4 ring-indigo-300/40"
            />
          </div>

          <AnimatePresence mode="wait">
            {editing ? (
              <motion.div
                key="edit-mode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 w-full"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-lg w-full text-center p-3 mb-3 shadow-sm transition"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-lg w-full text-center p-3 mb-4 shadow-sm transition"
                />
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center justify-center gap-2 font-medium py-2 px-4 rounded-xl shadow-md transition ${
                      saving
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} /> Save
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    disabled={saving}
                    className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-xl transition ${
                      saving && "opacity-70 cursor-not-allowed"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="view-mode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <h2 className="text-3xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600 flex items-center justify-center gap-2 mt-2">
                  <Mail size={16} /> {user.email}
                </p>
                <p className="text-gray-400 flex items-center justify-center gap-2 mt-2">
                  <CalendarDays size={16} />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => setEditing(true)}
                  className="mt-5 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-xl shadow-md transition"
                >
                  <Edit3 size={18} /> Edit Profile
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
