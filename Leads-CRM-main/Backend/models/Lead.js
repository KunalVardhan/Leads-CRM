import mongoose from "mongoose";

// Schema for individual activity logs
const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: String,
});

// Main Lead Schema
const leadSchema = new mongoose.Schema(
  {
 
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: String,
    city: String,
    company: String,
    status: {
      type: String,
      enum: ["Hot", "Warm", "Cold"],
      default: "Cold",
      set: v => v.trim(),
    },
      leadScore: {
    type: Number,
    default: 0,
  },
    // We use the activitySchema defined above for the array
    activities: [activitySchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export const Lead = mongoose.model("Lead", leadSchema);
export const Activity = mongoose.model("Activity", activitySchema);