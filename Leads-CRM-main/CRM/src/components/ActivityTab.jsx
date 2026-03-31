import { FaPhone, FaEnvelope, FaCalendar, FaUserEdit, FaHistory } from "react-icons/fa";

export default function ActivityTab({ activities }) {
  
  const getIcon = (type) => {
    switch (type) {
      case "call": return <div className="p-2 bg-green-100 rounded-full"><FaPhone className="text-green-600 size={14}" /></div>;
      case "email": return <div className="p-2 bg-blue-100 rounded-full"><FaEnvelope className="text-blue-600 size={14}" /></div>;
      case "meeting": return <div className="p-2 bg-purple-100 rounded-full"><FaCalendar className="text-purple-600 size={14}" /></div>;
      default: return <div className="p-2 bg-gray-100 rounded-full"><FaHistory className="text-gray-600 size={14}" /></div>;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Activity Timeline</h3>
        <span className="text-xs text-gray-400">{activities.length} Events Logged</span>
      </div>

      <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pr-2">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline Dot/Icon */}
              <div className="absolute -left-[21px] top-0 bg-white">
                {getIcon(activity.type)}
              </div>

              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-800 capitalize leading-none">
                    {activity.type} Interaction
                  </p>
                  <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">
                    {new Date(activity.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  System logged a {activity.type} activity for this lead.
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            No activity recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}