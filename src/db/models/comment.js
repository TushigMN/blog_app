import mongoose from "mongoose";

import { commentSchema } from "../schemas/commentSchema.js";

export const Comments = mongoose.model("Comments", commentSchema);
