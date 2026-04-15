const express = require("express");
const router = express.Router();
const Claim = require("../models/Claim");

// Create claim
router.post("/", async (req, res) => {
  try {
    const claim = new Claim(req.body);
    await claim.save();
    res.json(claim);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving claim");
  }
});

// Get all claims
router.get("/", async (req, res) => {
  try {
    const claims = await Claim.find();
    res.json(claims);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching claims");
  }
});

// Update status
router.put("/:id", async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(claim);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating claim");
  }
});

module.exports = router;