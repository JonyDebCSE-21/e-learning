import mongoose, { Schema, models } from "mongoose";

const userProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userRole: {
    type: String,
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
});

export const UserProfile =
  models?.UserProfile || mongoose.model("UserProfile", userProfileSchema);
