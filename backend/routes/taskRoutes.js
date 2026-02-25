const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

// GET all tasks
router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// CREATE task
router.post("/", protect, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    user: req.user._id
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// DELETE task
router.delete("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await task.deleteOne();
  res.json({ message: "Task removed" });
});

// UPDATE task (toggle complete or edit title)
router.put("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  task.title = req.body.title || task.title;
  task.completed = req.body.completed ?? task.completed;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

module.exports = router;