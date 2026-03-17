const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  type: String,
  date: {
    type: Date,
    default: Date.now,
  },
});



const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  company: String,

  leadScore: {
    type: Number,
    default: 0,
  },

  activities: [activitySchema],
  
});

const Lead = mongoose.model("Lead", leadSchema);
const Activity = mongoose.model("Activity", activitySchema);


module.exports = { Lead, Activity };
