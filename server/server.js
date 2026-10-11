import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import startupRoutes from "./routes/startupRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("FundFlow API is running");
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();