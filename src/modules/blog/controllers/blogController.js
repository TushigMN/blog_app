import express from "express";
import { Blogs } from "../../../db/models/blog.js";

export const blogRoutes = express.Router();

blogRoutes.post("/createBlog", async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const { userId } = req.user;
    const blog = await Blogs.create({
      title,
      description,
      content,
      userId,
    });
    res.send("blog posted");
  } catch (e) {
    res.send(e.message);
  }
});

blogRoutes.put("/update/:blogId", async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  const { title, description, content } = req.body;

  const blog = await Blogs.findOneAndUpdate(
    { _id: blogId, userId },
    { $set: { title, description, content } }
  );

  res.send(blog);
});
