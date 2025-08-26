import dotenv from "dotenv";
dotenv.config();

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET environment variable is required");
  process.exit(1);
}

import express from "express";
import cors from "cors";
import connectDB from "./conn/conn.js";
import auth from "./routes/auth.js";
import list from "./routes/list.js"; 

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo App API Server");
});

// Connect to database with error handling
try {
  await connectDB();
} catch (error) {
  console.error("Failed to connect to database:", error);
  process.exit(1);
}

app.use("/api/v1", auth);
app.use("/api/v2", list);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
