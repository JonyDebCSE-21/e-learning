import { dbConnect } from "@/lib/mongoose";
import { Post } from "@/models/post";
import { User } from "@/models/user";

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
      const posts = await Post.find({});

      let allPost = [];
      await Promise.all(
        posts.map(async (post) => {
          const user = await User.findOne({ _id: post.userId });
          const newPost = {
            user: user,
            _id: post._id,
            userId: post.userId,
            caption: post.caption,
            photos: post.photos,
            videos: post.videos,
            like: post.like,
            unlike: post.unlike,
            comments: post.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          };
          allPost.push(newPost);
        })
      );
      return res.status(200).send({
        error: false,
        post: allPost,
      });
    }
  }
  if (req.method === "POST") {
    const { userId, caption, photos, videos } = req.body;

    const postDoc = await Post.create({
      userId,
      caption,
      photos,
      videos,
      like: [],
      unlike: [],
      comments: [],
    });

    return res.status(200).send({
      error: false,
      post: postDoc,
      message: "Post Created Successfull",
    });
  }

  if (req.method === "PUT") {
    const { userId, postId, comment, commentId, like } = req.body;
    const post = await Post.findOne({ _id: postId });
    if (like) {
      const liked = post.like.includes(userId);
      if (liked) {
        const restLike = post.like.filter((l) => l != userId);
        const update = await Post.updateOne(
          { _id: postId },
          { like: [...restLike] }
        );
        return res.status(200).send({
          error: false,
          message: "unliked successfull",
        });
      }
      const update = await Post.updateOne(
        { _id: postId },
        { like: [...post.like, userId] }
      );
      return res.status(200).send({
        error: false,
        message: "liked successfull",
      });
    }
    if (commentId) {
      const restComment = post.comments.filter(
        (comment) => comment._id != commentId
      );
      const update = await Post.updateOne(
        { _id: postId },
        { comments: [...restComment] }
      );
      const updatedPost = await Post.findOne({ _id: postId });
      const comments = updatedPost.comments;
      return res.status(200).send({
        error: false,
        comments,
        message: "Comment posted successfull",
      });
    }
    if (post.comments.length > 0 && !commentId) {
      const update = await Post.updateOne(
        { _id: postId },
        { comments: [...post.comments, { userId, comment }] }
      );
      const updatedPost = await Post.findOne({ _id: postId });
      const comments = updatedPost.comments;
      return res.status(200).send({
        error: false,
        comments: comments,
        message: "Comment posted successfull",
      });
    } else {
      const update = await Post.updateOne(
        { _id: postId },
        { comments: [{ userId, comment }] }
      );
      const updatedPost = await Post.findOne({ _id: postId });
      const comments = updatedPost.comments;
      return res.status(200).send({
        error: false,
        comments: comments,
        message: "Comment posted successfull",
      });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    const course = await Post.deleteOne({ _id: id });
    return res.status(200).send({
      error: false,
      message: "Post Deleted Successful",
    });
  }
}
