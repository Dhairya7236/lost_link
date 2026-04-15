const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  contact: {
    type: String,
    required: true
  },

  // NEW FIELD FOR IMAGE
  image: {
    type: String,
    default: ""
  },

  // OPTIONAL (good for marks)
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Item", itemSchema);