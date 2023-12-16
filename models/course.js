import mongoose, { Schema, models } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});

export const Course = models?.Course || mongoose.model("Course", courseSchema);
