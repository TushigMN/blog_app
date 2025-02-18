import express from "express";
import { Users } from "../../../db/models/users.js";

export const userRoutes = express.Router();

userRoutes.get("/profile", async (req, res) => {
  const { userId } = req.query;

  const user = Users.findById(userId);
  res.send(user);
});
