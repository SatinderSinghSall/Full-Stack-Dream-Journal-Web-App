import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function DreamEntry() {
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/dreams", form);
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to save dream");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>New Dream Entry</h2>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Describe your dream..."
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <button type="submit">Save Dream</button>
    </form>
  );
}
