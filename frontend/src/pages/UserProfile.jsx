import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  Mail,
  CalendarDays,
  Save,
  ArrowLeft,
  Loader2,
  User as UserIcon,
  Users,
  Send,
} from "lucide-react";

import { getUserProfile, updateUserProfile } from "../api/api";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          status: res.data.status,
        });
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-500 text-lg">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-48 flex flex-col items-center justify-center rounded-t-2xl text-white">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Header Content */}
          <div className="text-center mt-1">
            <h1 className="text-2xl font-semibold tracking-wide">My Profile</h1>
            <p className="text-sm opacity-90 mt-0.5">{user.email}</p>
            <p className="text-sm opacity-75 flex items-center justify-center gap-2 mt-0.5">
              <UserIcon size={14} /> {user.status}
            </p>
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-14 w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            <img
              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}`}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-8 pt-16 pb-8 text-center md:text-left">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-1">
              <CalendarDays size={16} /> Joined{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>

            <button
              onClick={() => setEditing(true)}
              className="mt-4 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl shadow-md transition"
            >
              <Edit3 size={18} /> Edit Profile
            </button>
          </div>

          {/* Edit Form */}
          <AnimatePresence mode="wait">
            {editing && (
              <motion.div
                key="edit-mode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 bg-gray-50 rounded-xl shadow-inner"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-lg w-full text-center md:text-left p-3 shadow-sm transition"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-lg w-full text-center md:text-left p-3 shadow-sm transition"
                    placeholder="Email"
                  />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-lg w-full p-3 shadow-sm transition"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex gap-3 justify-end mt-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center gap-2 font-medium py-2 px-4 rounded-xl transition ${
                      saving
                        ? "bg-indigo-400 cursor-not-allowed text-white"
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
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Friends & Requests */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-5 text-center hover:shadow-lg transition">
              <Users size={28} className="mx-auto text-indigo-500 mb-2" />
              <h3 className="text-lg font-semibold text-gray-700">Friends</h3>
              <p className="text-gray-600 mt-1">{user.friends?.length || 0}</p>
              <ul className="mt-2 text-gray-500 text-sm list-disc list-inside max-h-40 overflow-auto">
                {user.friends?.map((f) => (
                  <li key={f._id}>{f.name || f}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-5 text-center hover:shadow-lg transition">
              <Users size={28} className="mx-auto text-purple-500 mb-2" />
              <h3 className="text-lg font-semibold text-gray-700">
                Friend Requests
              </h3>
              <p className="text-gray-600 mt-1">
                {user.friendRequests?.length || 0}
              </p>
              <ul className="mt-2 text-gray-500 text-sm list-disc list-inside max-h-40 overflow-auto">
                {user.friendRequests?.map((f) => (
                  <li key={f._id}>{f.name || f}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-5 text-center hover:shadow-lg transition">
              <Send size={28} className="mx-auto text-pink-500 mb-2" />
              <h3 className="text-lg font-semibold text-gray-700">
                Sent Requests
              </h3>
              <p className="text-gray-600 mt-1">
                {user.sentRequests?.length || 0}
              </p>
              <ul className="mt-2 text-gray-500 text-sm list-disc list-inside max-h-40 overflow-auto">
                {user.sentRequests?.map((f) => (
                  <li key={f._id}>{f.name || f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
