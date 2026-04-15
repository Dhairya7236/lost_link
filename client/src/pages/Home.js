import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then(res => setItems(res.data));
  }, []);

  const handleClaim = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Login first");

    await axios.post("http://localhost:5000/api/claims", {
      itemId: id,
      userName: user.name
    });

    alert("Claim sent");
  };

  const filtered = items.filter(i =>
    (i.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 style={{ color: "#38bdf8" }}>Lost & Found Items</h1>

      <input
        placeholder="Search..."
        onChange={e => setSearch(e.target.value)}
      />

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filtered.map(item => (
          <div
            key={item._id}
            className="card"
            style={{ width: "250px", cursor: "pointer" }}
            onClick={() => navigate(`/item/${item._id}`)}
          >
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt=""
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <h3>{item.title}</h3>
            <p>{item.location}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClaim(item._id);
              }}
            >
              Claim
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;