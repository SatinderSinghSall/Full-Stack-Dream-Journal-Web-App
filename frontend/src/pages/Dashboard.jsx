import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContext";
import DreamCard from "../components/DreamCard";
import UserMenu from "../components/UserMenu";

export default function Dashboard() {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterMood, setFilterMood] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const dreamsPerPage = 6;

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

  // const handleLogout = () => {
  //   toast.success("Logged out successfully!");
  //   logout();
  //   navigate("/login");
  // };

  const stats = [{ label: "Total Dreams", value: dreams.length }];

  const filteredDreams = dreams
    .filter((dream) => {
      const title = dream.title || "";
      const content = dream.content || "";
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

  // Pagination logic
  const totalPages = Math.ceil(filteredDreams.length / dreamsPerPage);
  const indexOfLastDream = currentPage * dreamsPerPage;
  const indexOfFirstDream = indexOfLastDream - dreamsPerPage;
  const currentDreams = filteredDreams.slice(
    indexOfFirstDream,
    indexOfLastDream
  );

  // Reset to page 1 when filters/search/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterMood, sortBy]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 relative">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-400">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Today is{" "}
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <UserMenu />
        </div>

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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-2xl font-semibold text-white">Your Dreams</h3>
          <Link
            to="/dream/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full font-semibold transition shadow-md"
          >
            <FiPlus className="text-lg" />
            Add New Dream
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 bg-gray-800 p-4 rounded-2xl shadow-sm">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search dreams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <select
            value={filterMood}
            onChange={(e) => setFilterMood(e.target.value)}
            className="px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">All Moods</option>
            <option value="Happy">Happy</option>
            <option value="Scary">Scary</option>
            <option value="Sad">Sad</option>
            <option value="Exciting">Exciting</option>
            <option value="Neutral">Neutral</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="rating">Most Vivid</option>
          </select>
        </div>

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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDreams.map((dream, index) => (
                <div
                  key={dream._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <DreamCard dream={dream} />
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  currentPage === totalPages
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white"
                }`}
              >
                Next
              </button>
            </div>
          </>
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
