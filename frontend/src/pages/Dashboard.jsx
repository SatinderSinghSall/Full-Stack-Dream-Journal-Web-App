import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import DreamCard from "../components/DreamCard";
import { FiPlus } from "react-icons/fi";

export default function Dashboard() {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔎 NEW STATES for search & filters
  const [search, setSearch] = useState("");
  const [filterMood, setFilterMood] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const res = await api.get("/dreams");
        setDreams(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDreams();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = [{ label: "Total Dreams", value: dreams.length }];

  const filteredDreams = dreams
    .filter((dream) => {
      const title = dream.title || "";
      const content = dream.content || ""; // match backend field
      const matchesSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        content.toLowerCase().includes(search.toLowerCase());

      const matchesMood = filterMood ? dream.mood === filterMood : true;

      return matchesSearch && matchesMood;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.dateOfDream) - new Date(a.dateOfDream);
      if (sortBy === "oldest")
        return new Date(a.dateOfDream) - new Date(b.dateOfDream);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 relative">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h2 className="text-3xl font-bold mb-4 sm:mb-0">
            Welcome, {user?.name} 👋
          </h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition shadow-md"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-800 rounded-2xl shadow-lg animate-pulse"
                >
                  <div className="h-8 w-16 bg-gray-700 mx-auto rounded mb-2"></div>
                  <div className="h-4 w-24 bg-gray-700 mx-auto rounded"></div>
                </div>
              ))
            : stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-800 rounded-2xl shadow-lg text-center hover:scale-105 transition"
                >
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
        </div>

        {/* Filters & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-2xl font-semibold">Your Dreams</h3>
          <Link
            to="/dream/new"
            className="inline-block px-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold transition shadow-md"
          >
            ➕ Add New Dream
          </Link>
        </div>

        {/* 🔎 Filter Controls */}
        <div className="flex flex-wrap gap-3 mt-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search dreams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Mood Filter */}
          <select
            value={filterMood}
            onChange={(e) => setFilterMood(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Moods</option>
            <option value="Happy">Happy</option>
            <option value="Scary">Scary</option>
            <option value="Sad">Sad</option>
            <option value="Exciting">Exciting</option>
            <option value="Neutral">Neutral</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="rating">Most Vivid (Rating)</option>
          </select>
        </div>

        {/* Dreams List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-800 rounded-2xl shadow-lg animate-pulse space-y-4"
              >
                <div className="h-40 bg-gray-700 rounded"></div>
                <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredDreams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDreams.map((dream, index) => (
              <div
                key={dream._id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DreamCard dream={dream} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16 text-gray-400">
            <div className="w-20 h-20 mb-4 rounded-full bg-gray-800 flex items-center justify-center shadow-inner">
              <span className="text-4xl">💤</span>
            </div>
            <p className="text-lg font-medium mb-2">No dreams found</p>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Button (Mobile) */}
      <Link
        to="/dream/new"
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg text-2xl font-bold transition"
      >
        <FiPlus />
      </Link>

      <style>
        {`
          .bg-grid-pattern {
            background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 40px 40px;
          }
          .animate-fade-in {
            animation: fadeInUp 0.5s ease forwards;
            opacity: 0;
          }
          @keyframes fadeInUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
