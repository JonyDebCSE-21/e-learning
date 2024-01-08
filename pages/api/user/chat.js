import { dbConnect } from "@/lib/mongoose";
import { Chat } from "@/models/chat";

export default async function handler(req, res) {
  const { method } = req;
  dbConnect();

  if (method === "GET") {
    const chatDoc = await Chat.find({});

    res.status(200).json({ chats: chatDoc });
  }

  if (method === "POST") {
    const { text, name } = req.body;

    try {
      const existingChat = await Chat.findOne();

      if (existingChat) {
        // If there is an existing chat, add the new text and name to the beginning of the arrays
        existingChat.name.unshift(name);
        existingChat.text.unshift(text);
        await existingChat.save();

        console.log("Updated chat:", existingChat);
        res
          .status(200)
          .json({ message: "Chat updated successfully", chats: existingChat });
      } else {
        // If no existing chat, create a new one with the provided text and name
        const chatDoc = await Chat.create({
          name: [name],
          text: [text],
        });

        console.log("Created new chat:", chatDoc);
        res
          .status(201)
          .json({ message: "Chat created successfully", chats: chatDoc });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
