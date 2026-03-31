import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function LeadSidebar({ leadScore, lead }) {
  return (
    <div className="p-5 space-y-6">
      {/* Lead Profile Card */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold text-lg mb-3">Lead Profile</h2>

        <div className="space-y-2 text-gray-600">
          <p className="flex items-center gap-2">
            <FaUser /> {lead.name}
          </p>

          <p className="flex items-center gap-2">
            <FaEnvelope /> {lead.email}
          </p>

          <p className="flex items-center gap-2">
            <FaPhone /> {lead.phone}
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> {lead.city}
          </p>
        </div>
      </div>

      {/* Lead Score Card */}

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold mb-2">Lead Score</h2>

        <p className="text-3xl font-bold text-blue-600">{leadScore}</p>

        {/* Progress bar */}

        {/* <div className="w-full mt-2">
          <div className="bg-blue-500 text-white text-center py-2 rounded font-semibold text-sm md:text-base">
            Lead Score: {leadScore}
          </div>
        </div> */}

      </div>

      {/* Engagement Card */}

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold mb-2">Engagement</h2>

        <p className="text-green-600 font-semibold">Active</p>

        <p className="text-gray-500 text-sm">Lead Age: 15 days</p>
      </div>
    </div>
  );
}
