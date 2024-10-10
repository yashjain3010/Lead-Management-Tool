const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const cors = require("cors");
const cron = require("node-cron");

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date();
    const twoDaysFromNow = new Date(today.setDate(today.getDate() + 1));

    const upcomingFollowUps = await Lead.find({
      nextFollowUpDate: { $gte: today, $lte: twoDaysFromNow },
    });

    console.log("Upcoming follow-ups:", upcomingFollowUps);
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.options("*", cors());
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Lead Management API");
});

module.exports = app;
