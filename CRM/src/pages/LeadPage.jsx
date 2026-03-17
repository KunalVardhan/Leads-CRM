import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads, createLead } from "../api/leadApi";

export default function LeadsPage() {

  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    company: "",
  });

  const fetchLeads = async () => {
    const res = await getLeads();
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createLead(form);

    // update UI instantly
    setLeads((prev) => [res.data, ...prev]);

    setShowModal(false);

    setForm({
      name: "",
      email: "",
      phone: "",
      city: "",
      company: "",
    });
  };

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Leads</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Lead
        </button>
      </div>

      {/* Leads Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Score</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {leads.map((lead) => (

              <tr key={lead._id} className="border-t hover:bg-gray-50">

                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.city}</td>
                <td className="p-3">{lead.company}</td>
                <td className="p-3 font-semibold">{lead.leadScore}</td>

                <td className="p-3">

                  <button
                    onClick={() => navigate(`/lead/${lead._id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Popup Modal */}

      {showModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">Add Lead</h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="company"
                placeholder="Company"
                value={form.company}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}