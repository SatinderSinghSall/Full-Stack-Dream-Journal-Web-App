import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold mb-6 text-white"
        >
          🌙 Dream Journal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-gray-300 mb-10 max-w-2xl"
        >
          Capture your dreams, discover hidden patterns, and reflect on your
          subconscious journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-x-4"
        >
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg text-lg font-semibold transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg text-lg font-semibold transition"
          >
            Login
          </Link>
        </motion.div>
      </section>

      <Features />

      <Footer />
    </div>
  );
}
