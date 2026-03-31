require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const leadRoutes = require("./routes/leadRoutes");
const documentRoutes = require("./routes/documentRoutes");
const noteRoutes = require("./routes/noteRoutes");   // <--- New: Notes routes
const taskRoutes = require("./routes/taskRoutes");
const dealRoutes = require( "./routes/dealRoutes.js");





const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/leads", leadRoutes);


app.use("/api/documents", documentRoutes);
app.use("/api/notes", noteRoutes);   // <--- New: Notes handling
app.use("/api/tasks", taskRoutes);
app.use("/api/deals", dealRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});