import { useState } from "react";
import axios from "axios";

function AddItem() {
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    contact: ""
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/items", formData);
      alert("Item added successfully");
    } catch (err) {
      alert("Error adding item");
    }
  };

  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh"
      }}
    >
      <div className="card" style={{ width: "400px" }}>
        <h2 style={{ textAlign: "center", color: "#38bdf8" }}>
          Add Lost / Found Item
        </h2>

        <input
          placeholder="Item Title"
          value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
        />

        <input
          placeholder="Description"
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
        />

        <input
          placeholder="Location"
          value={data.location}
          onChange={e => setData({ ...data, location: e.target.value })}
        />

        <input
          placeholder="Contact Number"
          value={data.contact}
          onChange={e => setData({ ...data, contact: e.target.value })}
        />

        {/* IMAGE PREVIEW */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            style={{
              width: "100%",
              marginTop: "10px",
              borderRadius: "8px"
            }}
          />
        )}

        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            marginTop: "15px"
          }}
        >
          Submit Item
        </button>
      </div>
    </div>
  );
}

export default AddItem;