import express from "express";
import bcrypt from "bcrypt";
import { Users } from "../../../db/models/users.js";

export const userRoutes = express.Router();

userRoutes.get("/get-token", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });

    res.send(user.getToken());
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.get("/profile", async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await Users.findOne({ _id: userId });
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.get("/others", async (req, res) => {
  const { username } = req.query;

  try {
    const user = await Users.find({ username: { $ne: username } });
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.get("/profile/:userId", async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await Users.findOne({ _id: userId });
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.put("/", async (req, res) => {
  const { email, username } = req.body;
  const { userId } = req.user;
  try {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { $set: { email, username } },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});
