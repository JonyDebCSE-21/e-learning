import mongoose, { Schema, models } from "mongoose";

const eventSchema = new Schema({
  title: String,
  date: String,
  image: String,
  interested: Number,
});

export const Event = models?.Event || mongoose.model("Event", eventSchema);
