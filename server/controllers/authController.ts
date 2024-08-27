import { Request, Response } from "express";
import { getUserModel } from "../models/userModel";
import { generateToken } from "../utils/jwtHelper";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response, next: Function) => {
  const { username, password } = req.body;
  const User = await getUserModel();

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    req.body.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req: Request, res: Response, next: Function) => {
  const { username, password } = req.body;
  const User = await getUserModel();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    req.body.user = newUser;

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const sendToken = (req: Request, res: Response, next) => {
  // Generate a token
  const user = req.body.user;
  const token = generateToken(user._id.toString(), user.username);
  res.cookie("token", token, {
    secure: true, // `true` if not in development
    sameSite: process.env.NODE_ENV === "development" ? "none" : "strict", // Allows cross-origin cookies
  });
  res.status(200).json("successfully provided token");
};

export const regenerateToken = (req: Request, res: Response, next) => {
  // Generate a token
  const user = req.body.user;
  const token = generateToken(user._id.toString(), user.username);
  res.cookie("token", token, {
    secure: true, // `true` if not in development
    sameSite: process.env.NODE_ENV === "development" ? "none" : "strict", // Allows cross-origin cookies
  });
  res.status(200).json("successfully provided token");
};
