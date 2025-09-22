const Agent = require("../modals/agent");
const bcrypt = require("bcryptjs");

// Add a new agent
exports.addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // check duplicate
    const exists = await Agent.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await agent.save();
    res.status(201).json({ message: "Agent created successfully", agent });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
