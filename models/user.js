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
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequestSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequestRecieved: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ],
});

export const User = models?.User || mongoose.model("User", userSchema);
