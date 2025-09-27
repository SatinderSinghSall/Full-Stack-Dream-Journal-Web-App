import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import DreamCard from "../components/DreamCard";

export default function Dashboard() {
  const [dreams, setDreams] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const res = await api.get("/dreams");
        setDreams(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDreams();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 relative">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
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

        <div className="mb-6 text-center sm:text-left">
          <Link
            to="/dream/new"
            className="inline-block px-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold transition shadow-md"
          >
            ➕ Add New Dream
          </Link>
        </div>

        {dreams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dreams.map((dream, index) => (
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
            <p className="text-lg font-medium mb-2">No dreams yet</p>
            <p className="text-sm text-gray-500">
              Start your journey by adding your first dream.
            </p>
            <Link
              to="/dream/new"
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold transition shadow-md"
            >
              ➕ Add New Dream
            </Link>
          </div>
        )}
      </div>

      <style>
        {`
          .bg-grid-pattern {
            background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 40px 40px;
          }
        `}
      </style>
    </div>
  );
}
