const Note = require("../models/Note");

exports.getNotesByLead = async (req, res) => {
  try {
    const notes = await Note.find({ leadId: req.params.leadId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

exports.createNote = async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: "Failed to save note" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};