import { Link } from "react-router-dom";

export default function DreamCard({ dream }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "12px",
      }}
    >
      <h3>{dream.title}</h3>
      <p>
        {dream.content && dream.content.length > 100
          ? dream.content.slice(0, 100) + "..."
          : dream.content}
      </p>
      <p>
        <b>Date:</b>{" "}
        {dream.dateOfDream
          ? new Date(dream.dateOfDream).toLocaleDateString()
          : "No date"}
      </p>
      <Link to={`/dream/${dream._id}`}>View Details →</Link>
    </div>
  );
}
