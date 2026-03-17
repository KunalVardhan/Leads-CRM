import { useState } from "react";
import { FaTasks, FaUserAlt, FaFileAlt } from "react-icons/fa";

import ActivityTab from "./ActivityTab";
import LeadDetailsTab from "./LeadDetailsTab";
import DocumentsTab from "./DocumentsTab";

export default function Tabs({
  lead,
  leadId,
  setLead,
  activities,
  refreshActivities
}) {

  const [activeTab, setActiveTab] = useState("activity");

  const tabs = [
    {
      id: "activity",
      label: "Activity History",
      icon: <FaTasks />,
    },
    {
      id: "details",
      label: "Lead Details",
      icon: <FaUserAlt />,
    },
    {
      id: "documents",
      label: "Documents",
      icon: <FaFileAlt />,
    },
  ];

  return (
    <div className="w-full mt-6">

      {/* Tabs Header */}

      <div className="bg-white shadow-sm rounded-xl p-2 mb-6">

        <div className="flex flex-wrap md:flex-nowrap gap-2">

          {tabs.map((tab) => (

            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              
              ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>

          ))}

        </div>

      </div>

      {/* Tab Content */}

      <div className="bg-white rounded-xl shadow p-5">

        {activeTab === "activity" && (
          <ActivityTab
            leadId={leadId}
            setLead={setLead}
            activities={activities}
            refreshActivities={refreshActivities}
          />
        )}

        {activeTab === "details" && (
          <LeadDetailsTab lead={lead} setLead={setLead}/>
        )}

        {activeTab === "documents" && (
          <DocumentsTab leadId={leadId} />
        )}

      </div>

    </div>
  );
}