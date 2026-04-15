import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/${id}`)
      .then(res => setItem(res.data));
  }, [id]);

  const update = async () => {
    const formData = new FormData();

    Object.keys(item).forEach(key => {
      formData.append(key, item[key]);
    });

    if (image) formData.append("image", image);

    await axios.put(`http://localhost:5000/api/items/${id}`, formData);

    alert("Updated!");
    setEdit(false);
  };

  if (!item) return <h2 className="page-container">Loading...</h2>;

  return (
    <div className="page-container">
      <div className="card" style={{ maxWidth: "500px" }}>
        <img
          src={`http://localhost:5000/uploads/${item.image}`}
          style={{ width: "100%" }}
          alt=""
        />

        {edit ? (
          <>
            <input value={item.title} onChange={e => setItem({...item, title: e.target.value})} />
            <input value={item.description} onChange={e => setItem({...item, description: e.target.value})} />
            <input value={item.location} onChange={e => setItem({...item, location: e.target.value})} />
            <input value={item.contact} onChange={e => setItem({...item, contact: e.target.value})} />

            <input type="file" onChange={e => setImage(e.target.files[0])} />

            <button onClick={update}>Save</button>
          </>
        ) : (
          <>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>{item.location}</p>
            <p>{item.contact}</p>

            <button onClick={() => setEdit(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemDetails;