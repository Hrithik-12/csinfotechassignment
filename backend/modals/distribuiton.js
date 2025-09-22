const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
});

const distributionSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  tasks: [taskSchema],
});

module.exports = mongoose.model("Distribution", distributionSchema);
