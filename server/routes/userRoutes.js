const express = require("express");
const User = require("../models/User");
const Note = require("../models/Note");
const { auth, admin } = require("../middleware/auth");
const router = express.Router();

// Get All Users (Admin Only)
router.get("/all", [auth, admin], async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a User (Admin Only)
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Platform Stats (Admin Only)
router.get("/stats", [auth, admin], async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const noteCount = await Note.countDocuments({ type: "note" });
    const questionCount = await Note.countDocuments({ type: "question" });
    
    res.json({ userCount, noteCount, questionCount });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
