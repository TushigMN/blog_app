import express from "express";
import { Comments } from "../../../db/models/comment.js";

export const comRoutes = express.Router();

comRoutes.post("/:blogId", async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;
    const { userId } = req.user;

    const comment = await Comments.create({
      blogId,
      userId,
      content,
    });
    res.send("comment posted.");
  } catch (e) {
    res.send(e.message);
  }
});

comRoutes.get("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  let { sort } = req.query;
  sort = Number(sort);

  try {
    const comment = await Comments.find({ blogId }).sort({
      createdAt: sort,
    });

    res.send(comment);
  } catch (e) {
    res.send(e.message);
  }
});

comRoutes.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comments.findByIdAndDelete({ _id: commentId });
    res.send("comment deleted.");
  } catch (e) {
    res.send(e.message);
  }
});
