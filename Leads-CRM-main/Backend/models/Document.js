const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ["aadhaar", "pan", "passport", "signature"],
      required: true,
    },
    fileName: String,
    fileUrl: String,
    status: {
      type: String,
      enum: ["pending", "verified"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);