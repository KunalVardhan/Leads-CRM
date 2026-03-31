import { useNavigate } from "react-router-dom";
import { addActivity } from "../api/leadApi";
import { FaPhone, FaEnvelope, FaCalendar, FaArrowLeft } from "react-icons/fa";

export default function LeadHeader({ lead, leadId, refreshActivities, setLead }) {
  const navigate = useNavigate();

  const handleAction = async (type) => {
    try {
      const res = await addActivity(leadId, type);
      
      // Update lead score in parent state
      if (setLead) {
        setLead((prev) => ({
          ...prev,
          leadScore: res.data.leadScore,
        }));
      }

      // Refresh activity list
      if (refreshActivities) {
        refreshActivities();
      }

      // Browser Actions
      if (type === "call") window.location.href = `tel:${lead?.phone || ""}`;
      if (type === "email") window.location.href = `mailto:${lead?.email || ""}`;
      
    } catch (error) {
      console.error("Action Error:", error);
    }
  };

  return (
    <div className="bg-white border-b px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Left side: Back & Lead Info */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(window.history.length > 1 ? -1 : "/leads")}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition"
        >
          <FaArrowLeft size={18} />
        </button>
        
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {lead?.name || "Loading..."}
            <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${
              lead?.status === 'Cold' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
            }`}>
              {lead?.status || "Active"}
            </span>
          </h1>
          <p className="text-xs text-gray-400">Lead ID: {leadId}</p>
        </div>
      </div>

      {/* Right side: Core Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleAction("call")}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-sm transition text-sm font-medium"
        >
          <FaPhone size={14} /> Call Customer
        </button>

        <button
          onClick={() => handleAction("email")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm transition text-sm font-medium"
        >
          <FaEnvelope size={14} /> Send Email
        </button>

        <button
          onClick={() => handleAction("meeting")}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-sm transition text-sm font-medium"
        >
          <FaCalendar size={14} /> Schedule Meeting
        </button>
      </div>
    </div>
  );
}