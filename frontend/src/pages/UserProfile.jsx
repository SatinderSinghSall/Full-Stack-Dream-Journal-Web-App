import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  // Mail,
  CalendarDays,
  Save,
  ArrowLeft,
  Loader2,
  User as UserIcon,
  Users,
  Send,
  Moon,
  Star,
  BarChart3,
} from "lucide-react";
import { getUserProfile, updateUserProfile, getDreams } from "../api/api";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
  });
  const [saving, setSaving] = useState(false);
  const [dreams, setDreams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, dreamsRes] = await Promise.all([
          getUserProfile(),
          getDreams(),
        ]);
        const userData = userRes.data;
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          status: userData.status,
        });
        setDreams(dreamsRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden p-8"
        >
          {/* Header Skeleton */}
          <div className="relative bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-48 rounded-t-2xl animate-pulse" />
          <div className="flex justify-center -mt-12">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-lg animate-pulse" />
          </div>

          {/* Profile Info Skeleton */}
          <div className="mt-8 px-8 space-y-4">
            <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto md:mx-0" />
            <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse mx-auto md:mx-0" />
            <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse mx-auto md:mx-0 mt-4" />
          </div>

          {/* Stats Section Skeleton */}
          <div className="mt-10 grid md:grid-cols-3 gap-6 px-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl shadow p-5 text-center animate-pulse"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto mb-3" />
                <div className="h-5 w-24 bg-gray-200 rounded-lg mx-auto mb-2" />
                <div className="h-6 w-12 bg-gray-200 rounded-lg mx-auto" />
              </div>
            ))}
          </div>

          {/* Chart + Dreams Skeleton */}
          <div className="mt-10 px-8 space-y-6">
            <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full h-64 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse mt-8" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-100 rounded-lg bg-gray-50 animate-pulse"
                >
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-1/3 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );

  // 🧮 DREAM STATS
  const totalDreams = dreams.length;
  const avgRating =
    dreams.length > 0
      ? (
          dreams.reduce((sum, d) => sum + (d.rating || 0), 0) / dreams.length
        ).toFixed(1)
      : "—";
  const moodCounts = dreams.reduce((acc, d) => {
    acc[d.mood] = (acc[d.mood] || 0) + 1;
    return acc;
  }, {});
  const mostCommonMood =
    Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const moodData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood,
    value: count,
  }));

  const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-48 flex flex-col items-center justify-center rounded-t-2xl text-white">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="text-center mt-1">
            <h1 className="text-2xl font-semibold tracking-wide">My Profile</h1>
            <p className="text-sm opacity-90 mt-0.5">{user.email}</p>
            <p className="text-sm opacity-75 flex items-center justify-center gap-2 mt-0.5">
              <UserIcon size={14} /> {user.status}
            </p>
          </div>

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

          {/* 🌙 DREAMS OVERVIEW */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Moon size={22} className="text-indigo-500" /> Dream Overview
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white rounded-xl shadow p-5 text-center hover:shadow-lg transition">
                <BarChart3 size={28} className="mx-auto text-indigo-500 mb-2" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Dreams
                </h3>
                <p className="text-gray-600 mt-1 text-2xl font-bold">
                  {totalDreams}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-5 text-center hover:shadow-lg transition">
                <Star size={28} className="mx-auto text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Avg Rating
                </h3>
                <p className="text-gray-600 mt-1 text-2xl font-bold">
                  {avgRating}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-5 text-center hover:shadow-lg transition">
                <Moon size={28} className="mx-auto text-pink-500 mb-2" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Common Mood
                </h3>
                <p className="text-gray-600 mt-1 text-2xl font-bold">
                  {mostCommonMood}
                </p>
              </div>
            </div>

            {/* Mood Distribution Chart */}
            {dreams.length > 0 && (
              <div className="mt-10 bg-white rounded-xl shadow p-5">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Mood Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={moodData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {moodData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Recent Dreams */}
            <div className="mt-8 bg-white rounded-xl shadow p-5">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Recent Dreams
              </h3>
              {dreams.length === 0 ? (
                <p className="text-gray-500 text-center">
                  No dreams recorded yet.
                </p>
              ) : (
                <ul className="space-y-3 max-h-60 overflow-auto">
                  {dreams.slice(0, 5).map((d) => (
                    <li
                      key={d._id}
                      className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="font-medium text-gray-800">{d.title}</div>
                      <div className="text-sm text-gray-500 flex justify-between">
                        <span>{d.mood}</span>
                        <span>
                          {new Date(d.dateOfDream).toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
