const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// home route
app.get("/", (req, res) => {
  res.send("API is running successfully");
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// protected test route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    userId: req.user
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});