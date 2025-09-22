const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./modals/user.js");

dotenv.config();

async function setupAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin user already exists ✅");
      mongoose.disconnect();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created ✅");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error setting up admin:", error);
    mongoose.disconnect();
  }
}

setupAdmin();