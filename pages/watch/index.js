import Layout from "@/components/layout/Layout";
import CommentModal from "@/components/shared/CommentModal";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { useSelector } from "react-redux";

const Watch = () => {
  const dateFormat = (inputDateTime) => {
    const dateObject = new Date(inputDateTime);

    const formattedDateTime = dateObject.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDateTime;
  };

  const [videoLinks, setVideoLinks] = useState([]);
  const [openModal, setOpenModal] = useState({ id: "", value: false });
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ id: null, value: "" });
  const user = useSelector((state) => state.userReducer.user);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!user) {
      router.push("/auth/Signin");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/api/user/post")
      .then((res) => {
        setVideoLinks([]);
        if (res.data.post) {
          res.data.post.map((p) => {
            if (p.videos != "") {
              setVideoLinks((prev) => [...prev, p]);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const post = videoLinks.find((post) => post._id == openModal.id);
    if (post) {
      setComments(post);
    }
  }, [openModal]);

  const handleComment = (e, postId) => {
    e.preventDefault();
    if (comment.value == "") {
      toast.error("Please enter a comment");
      return;
    }
    axios
      .put("/api/user/post", {
        userId: user._id,
        postId,
        comment: comment.value,
      })
      .then((res) => {
        setComment("");
        toast.success(res.data.message);
        const post = videoLinks.find((post) => post._id == postId);
        post.comments = res.data.comments;
        setVideoLinks([...videoLinks]);
      })
      .catch((err) => {
        console.log(err);
        setComment("");
      });
  };

  const handleDeleteComment = (id, postId) => {
    axios
      .put(`/api/user/post`, { postId: openModal.id, commentId: id })
      .then((res) => {
        const post = videoLinks.find((post) => post._id == postId);
        const restComment = post.comments.filter(
          (comment) => comment._id != id
        );
        setComments(restComment);
        post.comments = res.data.comments;
        toast.success("Comment deleted");
      })
      .catch((err) => console.log(err));
  };

  const handleLike = (id) => {
    axios
      .put("/api/user/post", { userId: user._id, postId: id, like: true })
      .then((res) => {
        let post = videoLinks.find((post) => post._id == id);
        const liked = post.like.includes(user._id);
        if (liked) {
          const restLike = post.like.filter((l) => l != user._id);
          post.like = [...restLike];
          setVideoLinks([...videoLinks]);
        } else {
          post.like.push(user._id);
          setVideoLinks([...videoLinks]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div>
        {videoLinks.map((post) => {
          return (
            <div className="my-5 w-4/6 mx-auto">
              <div className="bg-[#160030] text-[#A300B0] rounded p-4 my-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={
                        post.user?.profilePic
                          ? post.user.profilePic
                          : "/images/children.jpg"
                      }
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <p className="font-semibold mb-0 text-yellow-300">
                        {post.user?.name}
                      </p>
                      <span className="text-xs text-white">
                        {dateFormat(post.createdAt)}
                      </span>
                    </div>
                  </div>
                  <a href="#" className="text-gray-700">
                    <i className="fas fa-ellipsis-v"></i>
                  </a>
                </div>
                <p className="text-gray-500 text-lg mb-5">{post.caption}</p>
                {/* <img
                  src={post.photos}
                  className=" rounded mb-3 w-1/2 mx-auto h-[600px]"
                /> */}
                <div className="flex justify-center">
                  <iframe
                    width="460"
                    height="315"
                    src={post.videos}
                    title="YouTube video player"
                    className="my-3"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                </div>
                <div className=" flex items-center justify-between border-b py-2 border-t">
                  <div className="flex items-center space-x-20 ">
                    <button
                      type="button"
                      onClick={() => handleLike(post._id)}
                      className="flex items-center">
                      <BiSolidLike
                        className={`text-lg mr-2 ${
                          post.like.includes(user._id) ? "text-yellow-300" : ""
                        } `}
                      />
                      <p className="Like">Like</p>
                      <span className="ml-1">{post.like.length}</span>
                    </button>

                    <button
                      className="flex items-center"
                      onClick={() =>
                        setOpenModal({ id: post._id, value: true })
                      }>
                      <FaCommentAlt className="text-lg mr-2" />
                      <p className="comment" style={{ marginRight: "8px" }}>
                        Comment
                      </p>
                      {post.comments.length}
                    </button>
                    <div className="flex items-center">
                      <FaShare className="text-lg mr-2" />
                      30
                    </div>
                  </div>
                </div>
                <div className="my-3 flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <img
                      src={
                        post.user?.profilePic
                          ? post.user.profilePic
                          : "/images/children.jpg"
                      }
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                  <form
                    onSubmit={(e) => handleComment(e, post._id)}
                    className="flex flex-grow space-x-2">
                    <input
                      type="text"
                      onChange={(e) => {
                        setComment({ id: post._id, value: e.target.value });
                      }}
                      value={comment.id == post._id ? comment.value : ""}
                      placeholder="Write a comment..."
                      className="bg-gray-200 w-full outline-none py-1 px-2 rounded-2xl"
                    />
                    <input
                      type="submit"
                      value="Post"
                      className="bg-[#A300B0] text-white p-1 rounded-lg cursor-pointer"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        })}
        <CommentModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          comments={comments}
          setComments={setComments}
          handleDeleteComment={handleDeleteComment}
        />
      </div>
    </Layout>
  );
};

export default Watch;
