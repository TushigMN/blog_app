import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
} from "../controllers/comController.js";

export const comRoutes = express.Router();

comRoutes.post("/:blogId", createComment);

comRoutes.get("/:blogId", getComment);

comRoutes.delete("/:commentId", deleteComment);
