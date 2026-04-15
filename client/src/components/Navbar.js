import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      background: "#020617",
      color: "white",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.8)"
    }}>
      <h2 style={{ color: "#38bdf8" }}>LostLink</h2>

      <div>
        <Link to="/" style={{ color: "#38bdf8", margin: "0 10px" }}>Home</Link>
        <Link to="/login" style={{ color: "#38bdf8", margin: "0 10px" }}>Login</Link>
        <Link to="/register" style={{ color: "#38bdf8", margin: "0 10px" }}>Register</Link>
        <Link to="/add-item" style={{ color: "#38bdf8", margin: "0 10px" }}>Add</Link>
        <Link to="/admin" style={{ color: "#38bdf8", margin: "0 10px" }}>Admin</Link>
      </div>
    </div>
  );
}

export default Navbar;