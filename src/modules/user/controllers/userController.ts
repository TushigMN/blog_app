import { AuthRequest, IUser } from "../../..";
import { Users } from "../../../db/models/users";
import { Request, Response } from "express";

export const getToken = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user: any = await Users.findOne({ email });

    res.send(user.getToken());
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};

export const myProfile = async (req: AuthRequest, res: Response) => {
  const { userId } = req.user || ({} as IUser);

  try {
    const user = await Users.find({ _id: userId });
    res.send(user);
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};

export const others = async (req: Request, res: Response) => {
  const { username } = req.query;

  try {
    const user = await Users.find({ username: { $ne: username } });
    res.send(user);
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};

export const othersProfile = async (req: AuthRequest, res: Response) => {
  const { userId } = req.user || {};

  try {
    const user = await Users.findOne({ _id: userId });
    res.send(user);
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};

export const updateDetail = async (req: AuthRequest, res: Response) => {
  const { email, username } = req.body;
  const { userId } = req.user || {};
  try {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { $set: { email, username } },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknow Error");
  }
};
