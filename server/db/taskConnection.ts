import mongoose from "mongoose";

let connection: mongoose.Connection | null = null;

export const connectToTaskDatabase = async () => {
  if (!connection) {
    try {
      connection = await mongoose.createConnection(
        process.env.taskDBURI as string
      );
      console.log("connected to task DB");
      console.log("Established Connection,", connection !== null);
    } catch (error) {
      console.error("Failed to connect to task DB", error);
    }
  }
  return connection;
};
