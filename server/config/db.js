const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected Successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
