import { Routes, Route } from "react-router-dom";
import LeadsPage from "./pages/LeadPage";
import LeadDashboard from "./pages/LeadDashboard";     
import Homepage from "./pages/Homepage";     
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<LeadsPage/>}/>
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/lead/:id" element={<LeadDashboard />} />
      </Routes>
    
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );

}

export default App;