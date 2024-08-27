import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const generateToken = (userId: string, username: string) => {
  return jwt.sign(
    { userID: userId, username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
};

export const authenticateAndAttach = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = {};
    req.body.user._id = (decoded as any).userID;
    req.body.user.user_name = (decoded as any).user_name;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    console.log(error);
  }
};
