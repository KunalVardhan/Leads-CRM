const express = require("express");
const router = express.Router();
const { getDealByLead, updateDealStage } = require("../controllers/dealController");

router.get("/:leadId", getDealByLead);
router.patch("/:leadId", updateDealStage);

module.exports = router;