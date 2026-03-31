const Document = require("../models/Document");

// ✅ Upload
exports.uploadDocument = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { leadId, type } = req.body;

    if (!leadId || !type || !req.file) {
      return res.status(400).json({
        error: "leadId, type and file are required",
      });
    }

    // update if already exists
    let doc = await Document.findOne({ leadId, type });

    if (doc) {
      doc.fileName = req.file.originalname;
      doc.fileUrl = req.file.filename;
      doc.status = "pending";
      await doc.save();
    } else {
      doc = new Document({
        leadId,
        type,
        fileName: req.file.originalname,
        fileUrl: req.file.filename,
      });

      await doc.save();
    }

    res.json({ success: true, document: doc });

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all
exports.getAllDocuments = async (req, res) => {
  try {
    const { leadId } = req.params;

    const documents = await Document.find({ leadId });

    res.json({ documents });

  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete
exports.deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, document: doc });

  } catch (err) {
    console.log("STATUS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};