import { useNavigate } from "react-router-dom";
import { addActivity } from "../api/leadApi";

export default function LeadHeader({ lead, leadId, refreshActivities }) {
  const navigate = useNavigate();

  const handleActivity = async (type) => {
    try {
      await addActivity(leadId, type);

      if (refreshActivities) {
        refreshActivities();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/leads");
            }
          }}
          className="text-blue-600 text-sm mb-1 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          {lead?.name || "John Doe"}
        </h1>

        <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
          {lead?.status || "Active"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleActivity("activity")}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Activity
        </button>

        <button
          onClick={() => handleActivity("note")}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Notes
        </button>

        <button
          onClick={() => handleActivity("task")}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Tasks
        </button>

        <button
          onClick={() => handleActivity("sales")}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Sales Activity
        </button>

        <button
          onClick={() => handleActivity("email")}
          className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow"
        >
          Send Email
        </button>
      </div>
    </div>
  );
}
