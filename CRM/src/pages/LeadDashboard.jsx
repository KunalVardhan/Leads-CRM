import { useEffect, useState } from "react";
import LeadHeader from "../components/LeadHeader";
import LeadSidebar from "../components/LeadSidebar";
import Tabs from "../components/Tabs";
import { getLead, getActivities } from "../api/leadApi";
import { useParams } from "react-router-dom";

export default function LeadDashboard() {

  const [lead, setLead] = useState(null);
  const [activities, setActivities] = useState([]);

  const { id: leadId } = useParams();

  // fetch lead
  const fetchLead = async () => {
    try {
      const res = await getLead(leadId);
      setLead(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch activities
  const fetchActivities = async () => {
    try {
      const res = await getActivities(leadId);

      // newest activity on top
      setActivities([...res.data].reverse());

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (leadId) {
      fetchLead();
      fetchActivities();
    }
  }, [leadId]);

  if (!lead) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">

      <LeadHeader
        lead={lead}
        leadId={leadId}
        refreshLead={fetchLead}
        refreshActivities={fetchActivities}
      />

      <div className="flex">

        <LeadSidebar
          leadScore={lead.leadScore}
          lead={lead}
        />

        <Tabs
          lead={lead}
          leadId={leadId}
          setLead={setLead}
          refreshLead={fetchLead}
          activities={activities}
          refreshActivities={fetchActivities}
        />

      </div>

    </div>
  );
}