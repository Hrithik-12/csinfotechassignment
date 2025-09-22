const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authroute");
const agentroute = require("./routes/agentroute");
const distributionroute = require("./routes/distributionRoute");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentroute);
app.use("/api/distributions", distributionroute);


// Basic health check route
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT;


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ✅`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
