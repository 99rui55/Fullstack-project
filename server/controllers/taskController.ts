import { Request, Response } from "express";
import mongoose from "mongoose";
import { generateToken } from "../utils/jwtHelper";
import { getTaskModel } from "../models/taskModel";
import bcrypt from "bcrypt";

const ObjectId = mongoose.Types.ObjectId;

declare module "express-serve-static-core" {
  interface Request {
    userID?: string; // or any other type that matches your userID
  }
}

export const getTasks = async (req: Request, res: Response) => {
  try {
    // Get the Task model
    const Task = await getTaskModel();

    // Extract userID from query parameters
    const userID = req.body.user._id;

    // Check if userID is provided
    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Convert userID string to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userID);

    // Query tasks directly using Mongoose
    const tasks = await Task.find({ userID: userObjectId }).exec();

    // Respond with tasks
    res.status(200).json({ tasks });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    // Get the Task model
    const Task = await getTaskModel();

    // Extract data from request body
    const userID = req.body.user._id;
    const { task_name, task_description, is_finished } = req.body;

    // Create a new Task instance
    const newTask = new Task({
      userID,
      task_name,
      task_description,
      is_finished,
    });

    // Save the task to the database
    await newTask.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Error creating task", error });
  }
};

export const markTask = async (req: Request, res: Response) => {
  const { _id, is_finished } = req.body;
  const Task = await getTaskModel();
  await Task.updateOne({ _id }, { $set: { is_finished } });
  res.status(201).end();
};

export const deleteTask = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const Task = await getTaskModel();
  await Task.deleteOne({ _id });
  res.status(201).end();
};
