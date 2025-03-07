import { SortOrder } from "mongoose";
import { AuthRequest, IUser } from "../../..";
import { Comments } from "../../../db/models/comment";
import { Request, Response } from "express";

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const { content, parentId } = req.body;
    const { blogId } = req.params;
    const { userId } = req.user || ({} as IUser);

    const doc: {
      blogId: string;
      userId: string;
      content: string;
      parentId?: string;
    } = {
      blogId,
      userId,
      content,
    };

    if (parentId) {
      doc.parentId = parentId;
    }

    await Comments.create(doc);

    res.send("comment posted.");
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};

export const getReply = async (req: AuthRequest, res: Response) => {
  try {
    const { parentId } = req.query;
    const reply = Comments.find({ parentId });
    res.send(reply);
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};

export const getComment = async (req: AuthRequest, res: Response) => {
  const { blogId } = req.params;
  const { sort } = req.query;

  try {
    const comment = await Comments.find({ blogId }).sort({
      createdAt: Number(sort) as SortOrder,
    });

    res.send(comment);
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  const { commentId } = req.params;
  try {
    await Comments.findByIdAndDelete({ _id: commentId });
    res.send("comment deleted.");
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};
