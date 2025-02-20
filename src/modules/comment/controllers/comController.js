import { Comments } from "../../../db/models/comment.js";

export const createComment = async (req, res) => {
  try {
    const { content, parentId } = req.body;
    const { blogId } = req.params;
    const { userId } = req.user;

    const doc = {
      blogId,
      userId,
      content,
    };

    if (parentId) {
      doc["parentId"] = parentId;
    }

    await Comments.create(doc);

    res.send("comment posted.");
  } catch (e) {
    res.send(e.message);
  }
};

export const getReply = async (req, res) => {
  try {
    const { parentId } = req.query;
    const reply = Comments.find({ parentId });
    res.send(reply);
  } catch (e) {
    res.send(e.message);
  }
};

export const getComment = async (req, res) => {
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
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comments.findByIdAndDelete({ _id: commentId });
    res.send("comment deleted.");
  } catch (e) {
    res.send(e.message);
  }
};
