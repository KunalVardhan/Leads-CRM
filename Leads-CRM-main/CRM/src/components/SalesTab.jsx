import { useState, useEffect } from "react";
import {
  FaFlagCheckered,
  FaRocket,
  FaHandshake,
} from "react-icons/fa";

// Import API functions
import {
  getDealStage,
  updateDealStage,
} from "../api/leadApi"; // path adjust if needed

const stages = [
  "New",
  "Contacted",
  "Proposal",
  "Negotiation",
  "Closed Won",
];

export default function SalesTab({ leadId }) {
  const [currentStage, setCurrentStage] =
    useState("New");
  const [loading, setLoading] =
    useState(true);

  // Fetch stage
  useEffect(() => {
    const fetchStage = async () => {
      try {
        const res =
          await getDealStage(leadId);

        if (res.data.success) {
          setCurrentStage(
            res.data.stage
          );
        }
      } catch (err) {
        console.error(
          "Error fetching stage",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    if (leadId) fetchStage();
  }, [leadId]);

  // Update stage
  const handleStageChange =
    async (newStage) => {
      try {
        setCurrentStage(newStage);

        await updateDealStage(
          leadId,
          { stage: newStage }
        );
      } catch (err) {
        console.error(
          "Update failed",
          err
        );
      }
    };

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse text-gray-400">
        Loading Pipeline...
      </div>
    );

  const currentIdx =
    stages.indexOf(currentStage);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Deal Pipeline
          </h3>

          <p className="text-gray-400 text-sm">
            Track and manage your sales progress
          </p>
        </div>

        <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2">
          <FaRocket />
          Stage: {currentStage}
        </div>
      </div>

      {/* Pipeline */}
      <div className="flex items-center w-full mb-12 px-4">
        {stages.map((stage, index) => {
          const isCompleted =
            currentIdx >= index;
          const isCurrent =
            currentIdx === index;

          return (
            <div
              key={stage}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                    isCompleted
                      ? "bg-indigo-600 text-white scale-110"
                      : "bg-gray-100 text-gray-400"
                  } ${
                    isCurrent
                      ? "ring-4 ring-indigo-100"
                      : ""
                  }`}
                >
                  {index ===
                  stages.length - 1 ? (
                    <FaFlagCheckered size={14} />
                  ) : (
                    <span className="text-sm">
                      {index + 1}
                    </span>
                  )}
                </div>

                <span
                  className={`absolute -bottom-8 text-[11px] font-bold uppercase tracking-widest ${
                    isCompleted
                      ? "text-indigo-600"
                      : "text-gray-300"
                  }`}
                >
                  {stage}
                </span>
              </div>

              {index !==
                stages.length - 1 && (
                <div className="h-1.5 flex-1 mx-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-700"
                    style={{
                      width: isCompleted
                        ? currentIdx >
                          index
                          ? "100%"
                          : "50%"
                        : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action */}
      <div className="mt-16 bg-gradient-to-br from-gray-50 to-indigo-50/30 border border-indigo-100 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-500">
            <FaHandshake size={24} />
          </div>

          <div>
            <h4 className="font-bold text-gray-800">
              Update Deal Status
            </h4>

            <p className="text-xs text-gray-500">
              Move this lead to the next logical stage
            </p>
          </div>
        </div>

        <select
          value={currentStage}
          onChange={(e) =>
            handleStageChange(
              e.target.value
            )
          }
          className="w-full md:w-64 bg-white border-2 border-indigo-100 text-gray-700 font-semibold py-3 px-4 rounded-2xl focus:outline-none focus:border-indigo-500 cursor-pointer shadow-sm"
        >
          {stages.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}