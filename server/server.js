const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("Server starting...");

const app = express();

app.use(cors());
app.use(express.json());

// Test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is running");
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/lostlink")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
try {
  app.use("/api/auth", require("./routes/authRoutes"));
  app.use("/api/items", require("./routes/itemRoutes"));
  app.use("/api/claims", require("./routes/ClaimRoutes"));
  app.use("/uploads", express.static("uploads"));
} catch (err) {
  console.log("Route error:", err.message);
}

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});