import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import tasksRoutes from "./routes/tasks";
import { connectToUserDatabase } from "./db/userConnect";
import { connectToTaskDatabase } from "./db/taskConnection";
import * as dotenv from "dotenv";
import path from "path";
const cors = require("cors");

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true, // This allows cookies to be sent and received
    })
  );
  console.log("set up server for CORS");
}

app.use(express.static(path.join(__dirname, "../client/build")));

connectToUserDatabase();
connectToTaskDatabase();

// Json body parse middleware.
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
