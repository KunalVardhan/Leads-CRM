import { Lead, Activity } from "../models/Lead.js";
import sendLeadEmail from "../services/emailService.js";


// Create a Lead (Adds a default activity)
export const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    
    // Add an initial activity logle
    lead.activities.push({ type: "Lead Created" });
    
    await lead.save();
    
    // SEND REAL-TIME EMAIL
    await sendLeadEmail(lead);

    
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Lead
export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Leads (Sorted by newest first)
export const getLeads = async (req, res) => {
  try {
    // Sorting by createdAt ensures the newest leads show up at the top
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Lead (Used for status changes and general edits)
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensures status is 'Hot', 'Warm', or 'Cold'
    });

    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Activity & Update Lead Score
export const addActivity = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    const { type } = req.body;
    let score = 0;

    // Scoring Logic
    switch (type.toLowerCase()) {
      case "call": score = 10; break;
      case "email": score = 5; break;
      case "meeting": score = 15; break;
      default: score = 0;
    }

    lead.leadScore = Math.min(lead.leadScore + score, 100);
    lead.activities.push({ type });

    await lead.save();

    res.json({
      message: "Activity added",
      leadScore: lead.leadScore,
      activities: lead.activities,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all activities for a specific lead
export const getActivities = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).select("activities");
    res.json(lead.activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



 export const sendEmailToLead = async (req, res) => {
  try {
    const leadId = req.params.id;

    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Send Email
    await sendLeadEmail(lead);

    res.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};

