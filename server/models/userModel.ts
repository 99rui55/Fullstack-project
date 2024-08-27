import mongoose from "mongoose";
import { connectToUserDatabase } from "../db/userConnect";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);

export const getUserModel = async (): Promise<mongoose.Model<any>> => {
  const connection = await connectToUserDatabase();
  return connection.model("User", UserSchema);
};
