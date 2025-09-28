import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // toggle state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-3xl shadow-lg w-full max-w-md text-white relative"
      >
        {/* Attractive Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-indigo-400 hover:text-white transition shadow-sm"
        >
          <FiArrowLeft />
          Back
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

        <label className="block mb-4">
          <span className="text-gray-300">Name</span>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 outline-none transition"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-300">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 block w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 outline-none transition"
            required
          />
        </label>

        {/* Password with view/hide toggle */}
        <label className="block mb-6 relative">
          <span className="text-gray-300">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 block w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 outline-none transition pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[40px] right-3 text-gray-400 hover:text-gray-200 transition"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-2xl font-semibold transition shadow-md ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
