import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function DreamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dream, setDream] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "" });

  // Fetch dream details
  useEffect(() => {
    const fetchDream = async () => {
      try {
        const res = await api.get(`/dreams/${id}`);
        setDream(res.data);

        // Map backend fields -> frontend form
        setForm({
          title: res.data.title || "",
          description: res.data.content || "",
          date: res.data.dateOfDream ? res.data.dateOfDream.slice(0, 10) : "",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchDream();
  }, [id]);

  // Delete dream
  const handleDelete = async () => {
    if (window.confirm("Delete this dream?")) {
      try {
        await api.delete(`/dreams/${id}`);
        navigate("/dashboard");
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  // Update dream
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/dreams/${id}`, {
        title: form.title,
        content: form.description, // frontend → backend mapping
        dateOfDream: form.date, // frontend → backend mapping
      });
      setDream(res.data);
      setEditMode(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!dream) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      {!editMode ? (
        <>
          <h2>{dream.title}</h2>
          <p>{dream.content}</p>
          <p>
            <b>Date:</b>{" "}
            {dream.dateOfDream
              ? new Date(dream.dateOfDream).toLocaleDateString()
              : "No date"}
          </p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
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
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
