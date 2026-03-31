const Task = require("../models/Task");

exports.getTasksByLead = async (req, res) => {
  try {
    const tasks = await Task.find({ leadId: req.params.leadId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: "Failed to create task" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
};