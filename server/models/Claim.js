const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Claim", claimSchema);