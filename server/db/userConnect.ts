import mongoose from "mongoose";

let connection: mongoose.Connection | null = null;

export const connectToUserDatabase = async () => {
  if (!connection) {
    try {
      connection = await mongoose.createConnection(
        process.env.userDBURI as string
      );
      console.log("connected to user DB");
      console.log("Established Connection,", connection !== null);
    } catch (error) {
      console.error("Failed to connect to user DB", error);
    }
  }
  return connection;
};
