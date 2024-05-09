const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["basic", "average", "luxury"],
    required: true,
  },
  person: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ["maintenance", "occupied", "free"],
    default: "free",
  },
  price: {
    type: Number,
    required: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branches",
    required: true,
  },
});

// Create a model using the schema
const Room = mongoose.model("Roomes", roomSchema);

module.exports = Room;
