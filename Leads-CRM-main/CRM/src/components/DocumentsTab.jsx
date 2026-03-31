import { useEffect, useState } from "react";
import {
  uploadDocument,
  deleteDocument,
  getAllDocuments,
} from "../api/leadApi";

const documentTypes = [
  { label: "Aadhaar", value: "aadhaar" },
  { label: "PAN Card", value: "pan" },
  { label: "Passport", value: "passport" },
  { label: "Signature", value: "signature" }
];

export default function DocumentsTab({ leadId }) {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    const res = await getAllDocuments(leadId);
    setDocuments(res.data?.documents || []);
  };

  useEffect(() => {
    fetchDocuments();
  }, [leadId]);

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("leadId", leadId);
    formData.append("type", type);

    await uploadDocument(formData);
    // Reset file input after upload
    e.target.value = null;
    fetchDocuments();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      await deleteDocument(id);
      fetchDocuments();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h3 className="text-xl font-bold mb-6">Document Upload</h3>

      {/* --- Upload Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {documentTypes.map((type) => {
          const isUploaded = documents.some(d => d.type === type.value);
          
          return (
            <div key={type.value} className="p-4 border rounded-lg bg-gray-50">
              <label className="block text-sm font-medium mb-2">{type.label}</label>
              <input
                type="file"
                disabled={isUploaded} // Disable if already uploaded
                onChange={(e) => handleUpload(e, type.value)}
                className={`block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${
                  isUploaded ? "opacity-50 cursor-not-allowed" : "file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                }`}
              />
              {isUploaded && <p className="text-[10px] text-green-600 mt-1">Already uploaded</p>}
            </div>
          );
        })}
      </div>

      <hr className="my-6" />

      {/* --- Uploaded Documents List --- */}
      {/* --- Uploaded Documents List --- */}
<div>
  <h4 className="text-md font-semibold mb-4">Uploaded Documents</h4>
  {documents.length === 0 ? (
    <p className="text-gray-400 text-sm italic">No documents uploaded yet.</p>
  ) : (
    <ul className="space-y-3">
      {documents.map((doc) => (
        <li 
          key={doc._id} 
          className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-center gap-3">
            
            {/* MODIFIED: Green tick shows simply because the file is uploaded */}
            <span className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full text-green-600">
              ✓
            </span>
            
            <div>
              <p className="text-sm font-medium capitalize">{doc.type}</p>
              <p className="text-xs text-gray-500">{doc.fileName}</p>
            </div>
          </div>

          <button
            onClick={() => handleDelete(doc._id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title="Delete Document"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )}
</div>
    </div>
  );
}