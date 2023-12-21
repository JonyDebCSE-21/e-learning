import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  mobileNumber: {
    type: String,
  },
  location: {
    type: String,
  },
  education: {
    type: String,
  },
  recentJob: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  posts: [
    {
      caption: String,
      videos: String,
      photos: String,
      like: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId },
          like: Number,
        },
      ],
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
  ],
});

export const User = models?.User || mongoose.model("User", userSchema);
