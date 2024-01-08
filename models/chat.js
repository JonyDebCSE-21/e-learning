import mongoose, { Schema, models } from "mongoose";

const chatSchema = new Schema({
  name: {
    type: [String],
  },
  text: {
    type: [String],
  },
});

export const Chat = models?.Chat || mongoose.model("Chat", chatSchema);
