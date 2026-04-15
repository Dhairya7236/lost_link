import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [claims, setClaims] = useState([]);

  const fetchClaims = async () => {
    const res = await axios.get("http://localhost:5000/api/claims");
    setClaims(res.data);
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/claims/${id}`, { status });
    fetchClaims();
  };

  return (
    <div className="page-container">
      <h1 style={{ color: "#38bdf8", marginBottom: "20px" }}>
        Manage Claims
      </h1>

      <div className="card">
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left"
        }}>
          <thead>
            <tr style={{
              background: "#2563eb",
              color: "white"
            }}>
              <th style={{ padding: "12px" }}>Item ID</th>
              <th style={{ padding: "12px" }}>User</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {claims.map(c => (
              <tr key={c._id} style={{
                borderBottom: "1px solid #334155"
              }}>
                <td style={{ padding: "12px", color: "#94a3b8" }}>
                  {c.itemId}
                </td>

                <td style={{ padding: "12px" }}>
                  {c.userName}
                </td>

                <td style={{ padding: "12px" }}>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    background:
                      c.status === "approved" ? "#16a34a" :
                      c.status === "rejected" ? "#dc2626" :
                      "#facc15",
                    color: "black"
                  }}>
                    {c.status || "pending"}
                  </span>
                </td>

                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => updateStatus(c._id, "approved")}
                    style={{
                      background: "#16a34a",
                      marginRight: "10px"
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(c._id, "rejected")}
                    style={{
                      background: "#dc2626"
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {claims.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px", color: "#94a3b8" }}>
            No claims found
          </p>
        )}
      </div>
    </div>
  );
}

export default Admin;