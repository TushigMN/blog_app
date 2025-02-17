import mongoose from "mongoose";

import { blogSchema } from "../schemas/blogSchema.js";

export const Blogs = mongoose.model("Blogs", blogSchema);
