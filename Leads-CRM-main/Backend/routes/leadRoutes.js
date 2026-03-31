const express = require("express");

const router = express.Router();

const {
  createLead,
  getLead,
  getLeads,
  updateLead,
  addActivity,
  getActivities,
  sendEmailToLead,
} = require("../controllers/leadController");

// Routes
router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.post("/:id/activity", addActivity);
router.get("/:id/activities", getActivities);
router.post("/:id/send-email", sendEmailToLead);
module.exports = router;