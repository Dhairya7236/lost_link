import { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({});

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", data);
    alert("Registered");
  };

  return (
    <div className="page-container" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh"
    }}>
      <div className="card" style={{ width: "300px" }}>
        <h2>Register</h2>

        <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})} />
        <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />

        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default Register;