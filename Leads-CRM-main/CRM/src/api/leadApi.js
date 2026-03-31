import axios from "axios";

// 🔗 Base API
const API = axios.create({
  // baseURL: "https://leads-crm-k8cj.onrender.com/api/",
   baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================
// 🚀 LEADS API
// ======================

// Create Lead
export const createLead = (data) => API.post("/leads", data);

// Get Single Lead
export const getLead = (id) => API.get(`/leads/${id}`);

// Get All Leads
export const getLeads = () => API.get("/leads");

// Update Lead
export const updateLead = (id, data) =>
  API.put(`/leads/${id}`, data);

// ======================
// 📌 ACTIVITIES API
// ======================

// Add Activity
export const addActivity = (id, type) =>
  API.post(`/leads/${id}/activity`, { type });

// Get Activities
export const getActivities = (id) =>
  API.get(`/leads/${id}/activities`);

// ======================
// 📄 DOCUMENTS API
// ======================

export const uploadDocument = (data) =>
  API.post("/documents/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllDocuments = (leadId) =>
  API.get(`/documents/lead/${leadId}`);

export const deleteDocument = (id) =>
  API.delete(`/documents/delete/${id}`);

export const updateStatus = (id, status) =>
  API.put(`/documents/status/${id}`, { status });

// ======================
// 📧 EMAIL API
// ======================

export const sendEmail = (id, data) =>
  API.post(`/leads/${id}/send-email`, data);


// Get Tasks by Lead
export const getTasks = (leadId) =>
  API.get(`/tasks/${leadId}`);

// Create Task
export const createTask = (data) =>
  API.post("/tasks", data);

// Toggle / Update Task
export const updateTask = (id, data) =>
  API.patch(`/tasks/${id}`, data);

// Delete Task
export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

// ======================
// 📝 NOTES API
// ======================

// Get Notes by Lead
export const getNotes = (leadId) =>
  API.get(`/notes/${leadId}`);

// Create Note
export const createNote = (data) =>
  API.post("/notes", data);

// Delete Note
export const deleteNote = (id) =>
  API.delete(`/notes/${id}`);
// ======================
// 💼 DEALS / SALES PIPELINE API
// ======================

// Get Deal Stage
export const getDealStage = (leadId) =>
  API.get(`/deals/${leadId}`);

// Update Deal Stage
export const updateDealStage = (leadId, data) =>
  API.patch(`/deals/${leadId}`, data);