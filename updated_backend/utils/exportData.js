const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");
const Animal = require("../models/Animal");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Helper to export any collection dynamically
const exportCollection = async (Model, fileName) => {
  const docs = await Model.find().lean();

  if (!docs || docs.length === 0) {
    console.log(`No ${fileName} found to export!`);
    return;
  }

  // Convert to JSON with pretty formatting
  const json = JSON.stringify(docs, null, 2);

  fs.writeFileSync(`${fileName}.json`, json);
  console.log(`Exported ${fileName}.json`);
};

const exportAllData = async () => {
  await connectDB();
  await exportCollection(User, "users");
  await exportCollection(Animal, "animals");
  process.exit();
};

exportAllData();
