import axios from "axios";

// 🔗 Base API
const API = axios.create({
  baseURL: "https://leads-crm-k8cj.onrender.com/api/",
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
