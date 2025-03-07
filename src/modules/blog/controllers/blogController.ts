import { AuthRequest, IUser } from "../../..";
import { Blogs } from "../../../db/models/blog";
import { Request, Response } from "express";

export const createBlog = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, content } = req.body;
    const { userId } = req.user || ({} as IUser);
    const blog = await Blogs.create({
      title,
      description,
      content,
      userId,
    });
    res.send("blog posted");
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};

export const getBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const { title, description, content } = req.query;

  const blog = await Blogs.findOneAndUpdate(
    { _id: blogId },
    { $set: { title, description, content } }
  );

  res.send(blog);
};

export const profile = async (req: Request, res: Response) => {
  let { blogId, perPage = 10, page = 1 } = req.query;
  perPage = Number(perPage);
  page = Number(page);

  const blog = await Blogs.find({ blogId })
    .skip((page - 1) * perPage)
    .limit(perPage);

  res.send(blog);
};

export const detail = async (req: Request, res: Response) => {
  const { title } = req.query;
  const { blogId } = req.params;

  if (blogId) {
    const blog = await Blogs.findOne({
      title,
    });
    res.send(blog);
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const blog = await Blogs.findByIdAndDelete(blogId);
  res.send("blog deleted.");
};
