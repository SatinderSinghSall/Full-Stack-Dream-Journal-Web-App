import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-3xl shadow-lg w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

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

        <label className="block mb-6">
          <span className="text-gray-300">Password</span>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 block w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 outline-none transition"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold transition shadow-md"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
