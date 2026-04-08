const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  examDate: { type: String, required: true },
  examTime: { type: String, required: true },
  roomNumber: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Timetable", TimetableSchema);
