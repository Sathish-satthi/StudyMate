const express = require("express");
const multer = require("multer");
const Note = require("../models/Note");
const path = require("path");
const fs = require("fs");
const { auth, admin } = require("../middleware/auth");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Route (Only Admin)
router.post("/upload", [auth, admin], upload.single("file"), async (req, res) => {
  try {
    const { title, subject, module, type } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newNote = new Note({
      title,
      subject,
      module,
      type: type || "note",
      fileUrl: "/" + req.file.path.replace(/\\/g, "/")
    });

    await newNote.save();
    res.status(201).json({ message: `${type || "note"} uploaded successfully!`, note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get Items by Subject, Module, and Type (Public)
router.get("/:subject/:module/:type", async (req, res) => {
  try {
    const { subject, module, type } = req.params;
    const notes = await Note.find({ subject, module, type });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Route (Only Admin)
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Item not found" });
    }

    const filePath = path.join(__dirname, "..", note.fileUrl);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
