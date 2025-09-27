import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌙 Dream Journal</h1>
      <p>Track, explore, and reflect on your dreams.</p>
      <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
    </div>
  );
}
