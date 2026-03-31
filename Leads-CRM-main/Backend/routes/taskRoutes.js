const express = require("express");
const router = express.Router();
const { getTasksByLead, createTask, updateTaskStatus } = require("../controllers/taskController");

router.get("/:leadId", getTasksByLead);
router.post("/", createTask);
router.patch("/:id", updateTaskStatus);

module.exports = router;