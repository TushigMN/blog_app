import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userSchema } from "../schemas/userSchema.js";

class User {
  getToken() {
    const token = jwt.sign({ userId: this._id }, process.env.SECRET_KEY);

    return token;
  }

  static async register({ username, email, password }) {
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

  static async login({ email, password }) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("Email is wrong");
    }

    const valid = bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Password is wrong");
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    return token;
  }
}

userSchema.loadClass(User);

export const Users = mongoose.model("Users", userSchema);
