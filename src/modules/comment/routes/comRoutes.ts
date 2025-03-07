import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getReply,
} from "../controllers/comController";

export const comRoutes = express.Router();

comRoutes.post("/:blogId", createComment);

comRoutes.get("/:blogId", getComment);

comRoutes.delete("/:commentId", deleteComment);

comRoutes.get("/reply", getReply);
