import { dbConnect } from "@/lib/mongoose";
import { Post } from "@/models/post";

export default async function handeler(req, res) {
  dbConnect();
  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const post = await Post.find({ userId: id });
      return res.status(200).send({
        error: false,
        post,
      });
    } else {
      const post = await Post.find({});
      return res.status(200).send({
        error: false,
        post,
      });
    }
  }
  if (req.method === "POST") {
    const { userId, caption, photos } = req.body;

    const postDoc = await Post.create({
      userId,
      caption,
      photos,
      like: [],
      unlike: [],
      comment: [],
    });

    return res.status(200).send({
      error: false,
      post: postDoc,
      message: "Post Created Successfull",
    });
  }
}
