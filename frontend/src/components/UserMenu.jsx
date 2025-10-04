import { useState, useEffect, useRef, useContext } from "react";
import { LogOut, User, ChevronDown, Users } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    logout();
    navigate("/login");
  };

  const handleUserProfileClick = () => {
    toast.info("🚧 Profile section coming soon!");
  };

  const handleDreamDashboardClick = () => {
    toast.info("🚧 Dream Dashboard coming soon!");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 bg-gray-800 text-gray-100 px-4 py-2 rounded-full shadow hover:bg-gray-700 transition"
      >
        <User size={18} className="text-indigo-400" />
        <span className="hidden sm:block font-medium">
          {user?.name?.split(" ")[0] || "User"}
        </span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-200 border border-gray-700 shadow-xl rounded-xl overflow-hidden z-50 animate-fade-in-up">
          <ul className="text-sm divide-y divide-gray-700">
            <li
              onClick={handleUserProfileClick}
              className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
            >
              <User size={16} className="text-indigo-400" /> Profile
            </li>
            <li>
              <Link
                onClick={handleDreamDashboardClick}
                className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center gap-2 block"
              >
                <Users size={16} className="text-indigo-400" /> Dream Dashboard
              </Link>
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-3 hover:bg-red-600/20 text-red-400 cursor-pointer flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </li>
          </ul>
        </div>
      )}

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.15s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default UserMenu;
