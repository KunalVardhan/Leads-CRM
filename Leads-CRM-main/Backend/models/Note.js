const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  leadId: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "System User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);