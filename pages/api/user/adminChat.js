import { dbConnect } from "@/lib/mongoose";
import { AdminChat } from "@/models/AdminChat";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const chat = await AdminChat.findOne({ "sender._id": id });
      if (chat) {
        return res.status(200).send({
          error: false,
          message: "Chat fetched successfully",
          chat: chat,
        });
      } else {
        return res.status(200).send({
          error: false,
          message: "Chat not found",
          chat: null,
        });
      }
    } else {
      const chat = await AdminChat.find({});
      return res.status(200).send({
        error: false,
        chat,
      });
    }
  }
  if (req.method === "PUT") {
    const { message, userChat, adminChat, _id, userId, userName } = req.body;
    if (userChat) {
      const chat = await AdminChat.findOne({ _id: _id });
      if (chat) {
        const newChat = await AdminChat.updateOne(
          { _id: _id },
          {
            conversation: [
              ...chat.conversation,
              { sender: userId, message: message },
            ],
          }
        );
        return res.status(200).send({
          error: false,
          message: "Chat updated successfully",
        });
      } else {
        const newChat = await AdminChat.create({
          sender: { _id: userId, name: userName },
          reciever: "",
          conversation: [{ sender: userId, message: message }],
        });
        return res.status(200).send({
          error: false,
          message: "Chat updated successfully",
        });
      }
    } else if (adminChat) {
      const chat = await AdminChat.findOne({ _id: _id });
      if (chat) {
        const newChat = await AdminChat.updateOne(
          { _id: _id },
          { conversation: [...chat.conversation, { message: message }] }
        );
        return res.status(200).send({
          error: false,
          message: "Chat updated successfully",
        });
      }
    }
  }
}
