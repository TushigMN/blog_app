import express from "express";
import { Users } from "../../../db/models/users.js";

export const authRoutes = express.Router();

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await Users.register({ username, email, password });
    const token = user.getToken();

    res.send(token);
  } catch (e) {
    res.send(e.message);
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const token = await Users.login({ email, password });

    res.send(token);
  } catch (e) {
    res.send(e.message);
  }
};
