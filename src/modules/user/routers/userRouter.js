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
    const user = await Users.findOne({ userId });
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.get("/profile/userId", async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await Users.findOne({ userId });
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.put("/updatePro", async (req, res) => {
  const { email, password } = req.body;
  const { userId } = req.user;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { $set: { email, password: hashedPassword } },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});
