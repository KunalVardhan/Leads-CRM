import { addActivity } from "../api/leadApi";
import { FaPhone, FaEnvelope, FaCalendar } from "react-icons/fa";

export default function ActivityTab({ leadId, setLead, activities, refreshActivities }) {

  const handleActivity = async (type) => {

    const res = await addActivity(leadId, type);

    setLead((prev) => ({
      ...prev,
      leadScore: res.data.leadScore,
    }));

    refreshActivities();
  };

  const getIcon = (type) => {
    if (type === "call") return <FaPhone className="text-green-500" />;
    if (type === "email") return <FaEnvelope className="text-blue-500" />;
    if (type === "meeting") return <FaCalendar className="text-purple-500" />;
  };

  return (
    <div>

      <div className="flex gap-4 mb-6 flex-wrap">

        <button
          onClick={() => handleActivity("call")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Call Customer
        </button>

        <button
          onClick={() => handleActivity("email")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send Email
        </button>

        <button
          onClick={() => handleActivity("meeting")}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Schedule Meeting
        </button>

      </div>

      <h3 className="text-lg font-semibold mb-4">Activity History</h3>

      <div className="max-h-72 overflow-y-auto space-y-4 pr-2">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
          >

            <div className="text-xl">
              {getIcon(activity.type)}
            </div>

            <div>

              <p className="font-medium capitalize">
                {activity.type}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(activity.date).toLocaleString()}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}