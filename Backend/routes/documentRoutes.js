const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadDocument,
  getAllDocuments,
  deleteDocument,
  updateStatus,
} = require("../controllers/documentController");

// Upload
router.post("/upload", upload.single("file"), uploadDocument);

// Get all documents
router.get("/lead/:leadId", getAllDocuments);

// Delete
router.delete("/delete/:id", deleteDocument);

// Update status
router.put("/status/:id", updateStatus);

module.exports = router;