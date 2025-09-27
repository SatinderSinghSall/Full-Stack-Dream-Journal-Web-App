import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white text-center px-4">
      <h1 className="text-5xl font-extrabold mb-4">🌙 Dream Journal</h1>
      <p className="text-lg text-gray-300 mb-8 max-w-md">
        Track, explore, and reflect on your dreams.
      </p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-md transition"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-2xl shadow-md transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
