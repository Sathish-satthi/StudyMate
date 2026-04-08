const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { 
    type: String, 
    required: false, 
    enum: ["daa", "dt", "lss", "fsd", "atc", "general"] 
  },
  module: { 
    type: String, 
    required: false, 
    enum: ["Module 1", "Module 2", "Module 3", "Module 4", "All", "none"] 
  },
  fileUrl: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ["note", "question", "timetable"],
    default: "note"
  },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
