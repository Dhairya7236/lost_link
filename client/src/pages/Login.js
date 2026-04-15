import { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Login successful");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh"
      }}
    >
      <div
        className="card"
        style={{
          width: "350px",
          textAlign: "center"
        }}
      >
        <h2 style={{
          color: "#38bdf8",
          marginBottom: "20px"
        }}>
          Login
        </h2>

        <input
          placeholder="Email"
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            marginTop: "15px"
          }}
        >
          Login
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Don’t have an account?{" "}
          <span style={{ color: "#38bdf8", cursor: "pointer" }}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;