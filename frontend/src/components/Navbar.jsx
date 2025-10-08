import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { pathname } = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav
      className="w-full px-6 py-4 flex justify-between items-center 
      bg-gradient-to-r from-indigo-700/80 via-purple-700/80 to-pink-600/70 
      backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-md"
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2"
      >
        🌙{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-pink-300">
          Dream Journal
        </span>
      </Link>

      <div className="space-x-4 flex items-center relative">
        {/* Animated dropdown button (mobile) */}
        <button
          onClick={toggleDropdown}
          className="lg:hidden text-white focus:outline-none relative w-8 h-8 flex items-center justify-center"
        >
          <motion.div
            initial={false}
            animate={isDropdownOpen ? "open" : "closed"}
            className="relative w-6 h-6"
          >
            {/* Top line */}
            <motion.span
              variants={{
                closed: { rotate: 0, y: -6 },
                open: { rotate: 45, y: 0 },
              }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-1/2 w-full h-[2px] bg-white rounded origin-center"
            />
            {/* Middle line */}
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-1/2 w-full h-[2px] bg-white rounded"
            />
            {/* Bottom line */}
            <motion.span
              variants={{
                closed: { rotate: 0, y: 6 },
                open: { rotate: -45, y: 0 },
              }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-1/2 w-full h-[2px] bg-white rounded origin-center"
            />
          </motion.div>
        </button>

        {/* Animated dropdown menu (mobile) */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-14 right-0 bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 
              shadow-lg rounded-xl w-52 py-3 px-2 space-y-2 lg:hidden border border-white/20"
            >
              <Link
                to="/login"
                className={`block px-4 py-2 text-lg font-medium rounded-md transition ${
                  pathname === "/login"
                    ? "text-pink-300"
                    : "text-white hover:text-pink-300"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-600 
                text-white text-sm font-medium rounded-full shadow-md hover:opacity-90 transition-all"
              >
                Sign Up
              </Link>
              <a
                href="/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full hover:bg-white/30 transition-all"
              >
                Go to Dashboard
              </a>
              <a
                href="https://dream-journal-admin-panel.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full hover:bg-white/30 transition-all"
              >
                Admin Login
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular links for large screens */}
        <div className="hidden lg:flex space-x-4 items-center">
          <Link
            to="/login"
            className={`text-lg font-medium transition ${
              pathname === "/login"
                ? "text-pink-300"
                : "text-white hover:text-pink-300"
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-pink-500 to-indigo-600 
            text-white text-sm font-medium px-5 py-2 rounded-full shadow-md hover:opacity-90 transition-all"
          >
            Sign Up
          </Link>
          <a
            href="/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-white/30 transition-all"
          >
            Go to Dashboard
          </a>
          <a
            href="https://dream-journal-admin-panel.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full hover:bg-white/30 transition-all"
          >
            Admin Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
