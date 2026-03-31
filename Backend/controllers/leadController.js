import { Lead, Activity} from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ _id: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLead = async (req, res) => {
  console.log("update route hit");
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addActivity = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    const { type } = req.body;

    let score = 0;

    if (type === "call") score = 10;
    if (type === "email") score = 5;
    if (type === "meeting") score = 15;

    lead.leadScore = Math.min(lead.leadScore + score, 100);

    lead.activities.push({ type });

    await lead.save();

    res.json({
      message: "Activity added",
      leadScore: lead.leadScore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    res.json(lead.activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//upload document
// exports.uploadDocument = async (req, res) => {
//   try {
//     const lead = await Lead.findById(req.params.id);

//     lead.documents.push({
//       name: req.file.originalname,
//       path: req.file.path,
//     });

//     await lead.save();

//     res.json({
//       message: "Document uploaded",
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
