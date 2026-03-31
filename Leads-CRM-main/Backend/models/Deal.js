const mongoose = require("mongoose");

const DealSchema = new mongoose.Schema({
  leadId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Lead", 
    required: true 
  },
  stage: {
    type: String,
    enum: ["New", "Contacted", "Proposal", "Negotiation", "Closed Won"],
    default: "New",
  },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Deal", DealSchema);