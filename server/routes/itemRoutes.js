const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const multer = require("multer");

// =====================
// MULTER CONFIG
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// =====================
// ADD ITEM (WITH IMAGE)
// =====================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newItem = new Item({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      contact: req.body.contact,
      image: req.file ? req.file.filename : ""
    });

    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding item");
  }
});

// =====================
// GET SINGLE ITEM (IMPORTANT - KEEP FIRST)
// =====================
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching item");
  }
});

// =====================
// GET ALL ITEMS
// =====================
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching items");
  }
});

// =====================
// UPDATE ITEM (EDIT + IMAGE)
// =====================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      contact: req.body.contact
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating item");
  }
});

module.exports = router;