import { useEffect, useState } from "react";
import {
  uploadDocument,
  deleteDocument,
  getAllDocuments,
  updateStatus
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
    fetchDocuments();
  };

  const handleDelete = async (id) => {
    await deleteDocument(id);
    fetchDocuments();
  };

  const handleStatus = async (id, status) => {
    await updateStatus(id, status);
    fetchDocuments();
  };

  return (
    <div>

      <h3 className="text-lg font-semibold mb-4">Document Verification</h3>

      <div className="bg-white border rounded-lg overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">File</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            {documentTypes.map((type) => {
              const doc = documents.find(d => d.type === type.value);

              return (
                <tr key={type.value} className="border-t">

                  <td className="p-3">{type.label}</td>

                  <td className="p-3">
                    {doc ? doc.fileName : "No file"}
                  </td>

                  <td className="p-3">
                    {doc ? (
                      <span className={`px-2 py-1 rounded text-xs
                        ${doc.status === "verified"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                        }`}>
                        {doc.status}
                      </span>
                    ) : "-"}
                  </td>

                  <td className="p-3 text-right">

                    {/* Upload */}
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e, type.value)}
                    />

                    {/* View */}
                    {doc && (
                      <a
                        href={`http://localhost:5000/uploads/${doc.fileUrl}`}
                        target="_blank"
                        className="text-blue-600 ml-3"
                      >
                        View
                      </a>
                    )}

                    {/* Verify */}
                    {doc && (
                      <button
                        onClick={() => handleStatus(doc._id, "verified")}
                        className="text-green-600 ml-3"
                      >
                        Verify
                      </button>
                    )}

                    {/* Delete */}
                    {doc && (
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="text-red-500 ml-3"
                      >
                        Delete
                      </button>
                    )}

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}