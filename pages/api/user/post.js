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
      // posts.map(post=>{
      //  const user= await User.find({_id:post.userId})
      // })
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
    const { userId, postId, comment, commentId } = req.body;
    const post = await Post.findOne({ _id: postId });
    if (commentId) {
      const restComment = post.comments.filter(
        (comment) => comment._id != commentId
      );
      console.log(restComment, "restComment");
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

  // if (req.method === "DELETE") {
  //   const { postId, commentId } = req.body;
  //   if (commentId) {
  //     const post = await Post.find({ _id: postId });
  //   }
  //   const post = await Post.deleteOne({ _id: postId });
  //   return res.status(200).send({
  //     error: false,
  //     post,
  //     message: "Post Deleted Successfully",
  //   });
  // }
}
