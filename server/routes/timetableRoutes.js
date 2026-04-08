const express = require("express");
const Timetable = require("../models/Timetable");
const { auth, admin } = require("../middleware/auth");
const router = express.Router();

// Get Timetable (Public)
router.get("/", async (req, res) => {
  try {
    const schedule = await Timetable.find().sort({ examDate: 1 });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add/Update Timetable (Admin Only)
router.post("/add", [auth, admin], async (req, res) => {
  const { subjectName, examDate, examTime, roomNumber } = req.body;
  try {
    const newEntry = new Timetable({ subjectName, examDate, examTime, roomNumber });
    await newEntry.save();
    res.json(newEntry);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Timetable Entry (Admin Only)
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
