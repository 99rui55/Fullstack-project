import mongoose from "mongoose";
import { connectToTaskDatabase } from "../db/taskConnection";

const TaskSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    task_name: String,
    task_description: String,
    is_finished: Boolean,
  },
  { timestamps: true }
);

export const getTaskModel = async (): Promise<mongoose.Model<any>> => {
  const connection = await connectToTaskDatabase();
  return connection.model("Task", TaskSchema);
};
