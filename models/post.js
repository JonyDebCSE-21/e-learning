import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    caption: String,
    videos: String,
    photos: String,
    like: [{ type: String }],
    unlike: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId },
        unlike: Number,
      },
    ],
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId },
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

export const Post = models?.Post || mongoose.model("Post", postSchema);
