import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads, createLead, updateLead, sendEmail } from "../api/leadApi";


export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [emailModal, setEmailModal] = useState({ show: false, lead: null });
  const navigate = useNavigate();

  // Initial Form State
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    city: "",
    company: "",
    status: "Cold",
  };
  const [form, setForm] = useState(initialForm);

  // 1. Fetch Data
  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3. Update Status (Inline Table Action)
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Backend update
      await updateLead(id, { status: newStatus });
      // UI update
      setLeads((prev) =>
        prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      alert("Failed to update status. Check console.");
      console.error(err);
    }
  };

  // 4. Create New Lead
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createLead(form);
      setLeads((prev) => [res.data, ...prev]);
      setShowModal(false);
      setForm(initialForm); // Reset form
    } catch (err) {
      alert("Error saving lead. Is the server running?");
      console.error("Submit Error:", err.response?.data || err.message);
    }
  };

  // Send Email from frontend to backend
 // Send Email from frontend to backend
const handleSendEmail = async (lead) => {
  try {
    const res = await sendEmail(lead._id, {
      email: lead.email,
      name: lead.name,
      company: lead.company,
      phone: lead.phone,
    });

    if (res.data.success) {
      alert("Email sent successfully");
      setEmailModal({ show: false, lead: null });
    } else {
      alert("Email failed");
    }

  } catch (err) {
    console.error(err);
    alert("Error sending email");
  }
};
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Leads Dashboard</h1>
       <button
  onClick={() => setShowModal(true)}
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors shadow-sm"
>
  + Add New Lead
</button>
      </div>

      {/* Table section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Location</th>
              <th className="p-4">Company</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Quick Email</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-4 font-semibold text-gray-700">{lead.name}</td>
                <td className="p-4 text-gray-500">{lead.email}</td>
                <td className="p-4 text-gray-500">{lead.city || "-"}</td>
                <td className="p-4 text-gray-500">{lead.company || "-"}</td>
                <td className="p-4">
                  <select
                    value={lead.status || "Warm"}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                    className={`border rounded-md p-1.5 text-xs font-bold outline-none cursor-pointer
                      ${lead.status === 'Hot' ? 'bg-red-50 text-red-600 border-red-200' :
                        lead.status === 'Cold' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                          'bg-orange-50 text-orange-600 border-orange-200'}`}
                  >
                    <option value="Hot">Hot 🔥</option>
                    <option value="Warm">Warm ⚡</option>
                    <option value="Cold">Cold ❄️</option>
                  </select>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setEmailModal({ show: true, lead })}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-xs shadow-sm"
                  >
                    Send Template
                  </button>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/lead/${lead._id}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODALS --- */}

      {/* Add Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Lead</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                  <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company</label>
                  <input type="text" name="company" value={form.company} onChange={handleChange} className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Initial Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white">
                  <option value="Hot">Hot</option>
                  <option value="Warm">Warm</option>
                  <option value="Cold">Cold</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 text-gray-500 font-medium hover:text-gray-700">Cancel</button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-bold shadow-lg">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Email Template Preview Modal */}
      {emailModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-indigo-100">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Preview Template</h2>
            <p className="text-sm text-gray-400 mb-6 border-b pb-4">Recipient: <span className="text-indigo-600 font-semibold">{emailModal.lead.email}</span></p>

            <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 mb-6 relative">
              <span className="absolute -top-3 left-4 bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold shadow-sm">Standard Template</span>
              <div className="text-sm leading-relaxed text-gray-700 space-y-4">
                <p><strong>Subject:</strong> Quick follow-up regarding {emailModal.lead.company || "your business"}</p>
                <p>Hi {emailModal.lead.name},</p>
                <p>I noticed your company based in {emailModal.lead.city || "your area"} and wanted to reach out. I have a few ideas on how we could help you scale efficiently.</p>
                <p>Are you free for a 5-minute chat this week?</p>
                <p>Best regards,<br /><span className="font-bold">Lead Management Team</span></p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setEmailModal({ show: false, lead: null })} className="px-5 py-2 text-gray-500 font-medium hover:text-gray-700">Edit</button>
              <button
                onClick={() => handleSendEmail(emailModal.lead)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2"
              >
                Confirm & Send Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}