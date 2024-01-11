import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { PiVideoFill } from "react-icons/pi";
import { MdPhotoCamera } from "react-icons/md";
import { HiMiniDocumentPlus } from "react-icons/hi2";
import Header from "@/components/shared/Navbar/Header";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import CommentModal from "@/components/shared/CommentModal";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const imgStorageApi = "3f67787d6399449802b3d820607b790d";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;

const Newsflash = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState({ id: null, value: "" });
  const [openModal, setOpenModal] = useState({ id: "", value: false });
  const [comments, setComments] = useState([]);

  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [videoInput, setVideoInput] = useState(false);
  const [videoLink, setVideoLink] = useState(null);
  const router = useRouter();

  const user = useSelector((state) => state.userReducer.user);

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

  useEffect(() => {
    if (!user) {
      router.push("/auth/Signin");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/api/user/post")
      .then((res) => {
        setPosts(res.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const post = posts.find((post) => post._id == openModal.id);
    if (post) {
      setComments(post.comments);
    }
  }, [openModal]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    fetch(imgUploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        axios
          .post("/api/user/post", {
            userId: user._id,
            caption: status,
            videos: videoLink ? videoLink : "",
            photos: data?.data?.display_url ? data?.data.display_url : "",
          })
          .then((res) => {
            setPosts([...posts, res.data.post]);
            toast.success(res.data.message);
            setFilePreview(null);
            setStatus("");
            setFile(null);
            setVideoLink(null);
            setVideoInput(false);
          })
          .catch((err) => {
            console.log(err);
            setStatus("");
            setFile(null);
            setVideoLink(null);
            setVideoInput(false);
          });
      });
  };

  const handleComment = (e, postId) => {
    e.preventDefault();
    axios
      .put("/api/user/post", {
        userId: user._id,
        postId,
        comment: comment.value,
      })
      .then((res) => {
        setComment("");
        toast.success(res.data.message);
        const post = posts.find((post) => post._id == postId);
        post.comments = res.data.comments;
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
        const post = posts.find((post) => post._id == postId);
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
        let post = posts.find((post) => post._id == id);
        const liked = post.like.includes(user._id);
        if (liked) {
          const restLike = post.like.filter((l) => l != user._id);
          post.like = [...restLike];
          setPosts([...posts]);
        } else {
          post.like.push(user._id);
          setPosts([...posts]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="flex-basis-47 bg-gray-200  w-4/6 mx-auto">
        <div className="w-full bg-[#160030] text-[#A300B0] rounded p-4 my-5">
          <div className="flex items-center">
            <img
              src={user?.profilePic ? user.profilePic : "/images/children.jpg"}
              className="w-12 h-12 rounded-full mr-2"
            />
            <div>
              <p className="font-semibold mb-0 text-yellow-300">{user?.name}</p>
              <small className="text-xs">
                Public <i className="fas fa-caret-down"></i>
              </small>
            </div>
          </div>

          <form onSubmit={handlePostSubmit} className="pl-14 pt-2">
            <textarea
              rows="2"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              placeholder="Share your thoughts, with your community"
              className="w-full border-0 outline-none border-b border-gray-500 bg-transparent resize-none"></textarea>
            {filePreview && (
              <div className="relative">
                <img src={filePreview} alt="" className="w-[200px] h-[200px]" />
                <button
                  onClick={() => setFilePreview(null)}
                  className="absolute top-0 left-[190px]">
                  X
                </button>
              </div>
            )}
            <div className="add-post-links flex">
              <button
                type="button"
                onClick={() => setVideoInput(!videoInput)}
                className="flex items-center text-gray-700 mr-6 cursor-pointer">
                <PiVideoFill className="text-lg mr-2" />
                <span className="text-lg mr-2">Videos</span>
              </button>

              <label
                for="photo-upload"
                className="flex items-center text-gray-700 mr-6 cursor-pointer">
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const url = URL.createObjectURL(e.target.files[0]);
                    setFilePreview(url);
                    setFile(e.target.files[0]);
                  }}
                />
                <MdPhotoCamera className="text-lg mr-2" />
                <span className="text-lg mr-2">Photos</span>
              </label>

              <label
                for="document-upload"
                className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="file"
                  id="document-upload"
                  className="hidden"
                  accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx"
                />
                <HiMiniDocumentPlus className="text-lg mr-2" />
                <span className="text-lg mr-2">Documents</span>
              </label>
            </div>
            {videoInput && (
              <input
                type="text"
                onChange={(e) => {
                  setVideoLink(e.target.value);
                }}
                value={videoLink}
                placeholder="Enter video link"
                className="outline-none px-3 py-2 rounded-lg bg-gray-500 block text-white my-3"
              />
            )}
            <button className="bg-[#A300B0] px-5 py-2 mt-2 rounded text-white">
              Post
            </button>
          </form>
        </div>
        {posts?.map((post) => (
          <div className="bg-[#160030] text-[#A300B0] rounded p-4 my-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={
                    post?.user?.profilePic
                      ? post?.user?.profilePic
                      : "/images/children.jpg"
                  }
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold mb-0 text-yellow-300">
                    {post?.user?.name}
                  </p>
                  <span className="text-xs text-white">
                    {dateFormat(post?.createdAt)}
                  </span>
                </div>
              </div>
              <a href="#" className="text-gray-700">
                <i className="fas fa-ellipsis-v"></i>
              </a>
            </div>
            <p className="text-gray-500 text-lg mb-5">{post?.caption}</p>
            {post.photos && (
              <img
                src={post.photos}
                className=" rounded mb-3 w-1/2 mx-auto h-[600px]"
              />
            )}
            {post.videos && post.photos && (
              <div className="border-b border-[#A5009B]"></div>
            )}
            {post.videos && (
              <div className="flex justify-center my-5">
                <iframe
                  width="560"
                  height="315"
                  src={post.videos}
                  title="YouTube video player"
                  className="my-3"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
              </div>
            )}
            <div className="">
              <div className="flex space-x-20 ">
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
                  onClick={() => setOpenModal({ id: post._id, value: true })}>
                  <FaCommentAlt className="text-lg mr-2" />
                  <p className="comment" style={{ marginRight: "8px" }}>
                    Comment
                  </p>
                  {post.comments.length}
                </button>
                <div className="flex items-center mr-5 mb-2">
                  <FaShare className="text-lg mr-2" />4
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
                    className="bg-[#A5009B] text-white p-1 rounded-lg cursor-pointer"
                  />
                </form>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="load-more-btn bg-blue-500 text-white p-2 rounded">
          Load More
        </button>
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

export default Newsflash;
