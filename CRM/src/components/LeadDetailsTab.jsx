import { useState, useEffect } from "react";
import { updateLead } from "../api/leadApi";
import { toast } from "react-toastify";

export default function LeadDetailsTab({ lead, setLead }) {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    company: "",
  });

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        city: lead.city || "",
        company: lead.company || "",
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateLead(lead._id, form);

      // update UI with API response
      setLead({ ...res.data });

      // close modal
      setShowModal(false);

      toast.success("Lead updated successfully ✅");
    } catch (error) {
      console.error(error);
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">{lead.name}</h2>
          <p className="text-gray-500 text-sm">{lead.company}</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      {/* Lead Score */}

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Lead Score</span>
          <span>{lead.leadScore}</span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${lead.leadScore}%` }}
          />
        </div>
      </div>

      {/* Lead Details */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500">Email</p>
          <p className="font-medium">{lead.email}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500">Phone</p>
          <p className="font-medium">{lead.phone}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500">City</p>
          <p className="font-medium">{lead.city}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <p className="text-gray-500">Company</p>
          <p className="font-medium">{lead.company}</p>
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Lead</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Name"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Email"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Phone"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="City"
              />

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Company"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border px-3 py-1 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
