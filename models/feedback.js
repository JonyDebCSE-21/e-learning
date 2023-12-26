import { Schema, model, models } from "mongoose";

const feedbackShcema = new Schema({
  name: { type: String },
  email: { type: String },
  feedback: { type: String },
  rating: { type: Number },
});

export const Feedback = models?.Feedback || model("Feedback", feedbackShcema);
