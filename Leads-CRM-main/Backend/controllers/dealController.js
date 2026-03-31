const Deal = require("../models/Deal");

// Fetch deal by Lead ID
exports.getDealByLead = async (req, res) => {
  try {
    let deal = await Deal.findOne({ leadId: req.params.leadId });
    
    // If no deal exists yet for this lead, create a default one
    if (!deal) {
      deal = await Deal.create({ leadId: req.params.leadId, stage: "New" });
    }

    res.status(200).json({ success: true, stage: deal.stage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update deal stage
exports.updateDealStage = async (req, res) => {
  try {
    const { stage } = req.body;
    const deal = await Deal.findOneAndUpdate(
      { leadId: req.params.leadId },
      { stage, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, stage: deal.stage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};