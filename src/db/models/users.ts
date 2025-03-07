import mongoose, { Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema } from "../schemas/userSchema";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  getToken(): string;
}

interface UserModel extends Model<IUser> {
  register(
    this: UserModel,
    {
      username,
      email,
      password,
    }: { email: string; password: string; username: string }
  ): Promise<IUser>;

  login(
    this: UserModel,
    { email, password }: { email: string; password: string }
  ): Promise<string>;
}

class User {
  getToken(this: IUser): string {
    const token = jwt.sign(
      { userId: this._id },
      process.env.SECRET_KEY as string
    );
    return token;
  }

  static async register(
    this: UserModel,
    {
      username,
      email,
      password,
    }: { email: string; password: string; username: string }
  ): Promise<IUser> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doc = {
      username,
      email,
      password: hashedPassword,
    };

    const nameChecker = await this.findOne({ username });
    if (nameChecker) {
      throw new Error("Username is already taken");
    }

    const user = await this.create(doc);

    return user;
  }

  static async login(
    this: UserModel,
    { email, password }: { email: string; password: string }
  ): Promise<string> {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("Email is wrong");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Password is wrong");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string
    );

    return token;
  }
}

userSchema.loadClass(User);

export const Users = mongoose.model<IUser, UserModel>("Users", userSchema);
