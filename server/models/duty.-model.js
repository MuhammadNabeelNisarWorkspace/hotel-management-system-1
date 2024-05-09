const mongoose = require("mongoose");

const dutySchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rooms",
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "incomplete", "pending"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  remarks: {
    type: String,
    required: false,
  },
});

// Create a model using the schema
const Duty = mongoose.model("duty", dutySchema);

module.exports = Duty;
