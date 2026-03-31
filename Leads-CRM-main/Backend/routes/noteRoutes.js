const express = require("express");
const router = express.Router();
const { getNotesByLead, createNote, deleteNote } = require("../controllers/noteController");

router.get("/:leadId", getNotesByLead);
router.post("/", createNote);
router.delete("/:id", deleteNote);

module.exports = router;