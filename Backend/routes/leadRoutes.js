const express = require("express");
const router = express.Router();

const {
  createLead,
  getLead,
  addActivity,
  getActivities,
  getLeads,
  updateLead
} = require("../controllers/leadController");


router.post("/", createLead);

router.get("/:id", getLead);

router.get("/", getLeads);

router.put("/:id", updateLead);

router.post("/:id/activity", addActivity);

router.get("/:id/activities", getActivities);



module.exports = router;