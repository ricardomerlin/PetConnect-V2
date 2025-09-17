const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS middleware
const connectDB = require("./config/db");
const cron = require("node-cron");
const { getAnimalsFromPetfinder } = require("./controllers/animalController");


dotenv.config();
const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// DB connect
connectDB();

cron.schedule("0 0 * * *", () => {
  console.log("⏰ Running daily Petfinder sync...");
  getAnimalsFromPetfinder();
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/animals", require("./routes/animalRoutes"));

// Error handler middleware
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));