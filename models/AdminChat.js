import mongoose, { models } from "mongoose";
import { Schema } from "mongoose";

const AdminChatSchema = new Schema({
  sender: Object,
  reciever: String,
  conversation: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId },
      reciever: String,
      message: { type: String },
    },
  ],
});

export const AdminChat =
  models?.AdminChat || mongoose.model("AdminChat", AdminChatSchema);
