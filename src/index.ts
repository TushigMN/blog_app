import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { userRoutes } from "./modules/user/routes/userRoutes";
import { blogRoutes } from "./modules/blog/routes/blogRoutes";
import { authRoutes } from "./modules/auth/routes/authRoutes";
import { comRoutes } from "./modules/comment/routes/comRoutes";
dotenv.config();

mongoose.connect(process.env.MONGO_URL || "").then(() => {
  console.log("connected to MONGO");
});

const app = express();

app.use(express.json());

export interface IUser {
  userId: string;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] || "";

  if (!authHeader) {
    res.send("Token!!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY || "") as IUser;

    req.user = user;

    next();
  } catch (e) {
    res.send("Auth token invalid");
  }
};

app.use("/", authRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/blogs", authMiddleware, blogRoutes);
app.use("/comment", authMiddleware, comRoutes);
app.use("/data", authMiddleware);

app.listen(3000, () => {
  console.log("app running on 3000");
});
