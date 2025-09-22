const express = require("express");
const router = express.Router();
const { addAgent, getAgents } = require("../controllers/agentController");

// Add new agent
router.post("/", addAgent);

// Get all agents
router.get("/", getAgents);

module.exports = router;
