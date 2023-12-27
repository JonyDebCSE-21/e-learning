import mongoose, { Schema, models } from "mongoose";

const classroomSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    albumName: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    notes: { type: String },
  },
  { timestamps: true }
);

export const Classroom =
  models?.Classroom || mongoose.model("Classroom", classroomSchema);
