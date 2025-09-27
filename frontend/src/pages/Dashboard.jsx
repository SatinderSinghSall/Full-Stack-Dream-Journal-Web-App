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
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Welcome, {user?.name} 👋</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Your Dreams</h3>
      <Link to="/dream/new">➕ Add New Dream</Link>

      <div style={{ marginTop: "20px" }}>
        {dreams.length > 0 ? (
          dreams.map((dream) => <DreamCard key={dream._id} dream={dream} />)
        ) : (
          <p>No dreams yet. Start by adding one!</p>
        )}
      </div>
    </div>
  );
}
