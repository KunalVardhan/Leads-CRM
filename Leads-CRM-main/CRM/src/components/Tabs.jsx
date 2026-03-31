import { useState } from "react";
import { FaTasks, FaUserAlt, FaFileAlt, FaStickyNote, FaCheckSquare, FaChartLine } from "react-icons/fa";

import ActivityTab from "./ActivityTab";
import LeadDetailsTab from "./LeadDetailsTab";
import DocumentsTab from "./DocumentsTab";
import NotesTab from "./NotesTab";
import SalesTab from "./SalesTab";
import TasksTab from "./TasksTab";

export default function Tabs({
  lead,
  leadId,
  setLead,
  activities,
  refreshActivities
}) {
  const [activeTab, setActiveTab] = useState("activity");

  const tabs = [
    { id: "activity", label: "Activity", icon: <FaTasks /> },
    { id: "details", label: "Lead Details", icon: <FaUserAlt /> },
    { id: "documents", label: "Documents", icon: <FaFileAlt /> },
    { id: "notes", label: "Notes", icon: <FaStickyNote /> },
    { id: "tasks", label: "Tasks", icon: <FaCheckSquare /> },
    { id: "sales", label: "Sales Activity", icon: <FaChartLine /> },
  ];

  return (
    <div className="w-full px-4 mt-2">
      {/* Tab Navigation - Modern Underline Style */}
      <div className="flex items-center border-b border-gray-200 mb-6 bg-white px-4 rounded-t-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all relative
              ${activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
          >
            <span className={activeTab === tab.id ? "text-blue-600" : "text-gray-400"}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px] transition-all">
        <div className="p-6">
          {activeTab === "activity" && (
            <ActivityTab
              leadId={leadId}
              setLead={setLead}
              activities={activities}
              refreshActivities={refreshActivities}
            />
          )}

          {activeTab === "details" && (
            <LeadDetailsTab lead={lead} setLead={setLead} />
          )}

          {activeTab === "documents" && (
            <DocumentsTab leadId={leadId} />
          )}

          {/* Placeholder logic for missing tabs to keep the app functional */}
          {/* New Components */}
          {activeTab === "notes" && <NotesTab leadId={leadId} />}
          {activeTab === "tasks" && <TasksTab leadId={leadId} />}
          {activeTab === "sales" && <SalesTab leadId={leadId} />}
        </div>
      </div>
    </div>
  );
}