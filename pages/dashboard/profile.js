import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { HiAcademicCap } from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { PiVideoFill } from "react-icons/pi";
import { MdPhotoCamera } from "react-icons/md";
import { HiMiniDocumentPlus } from "react-icons/hi2";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUserFriends } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import CommentModal from "@/components/shared/CommentModal";
import { RiDeleteBin6Line } from "react-icons/ri";

const imgStorageApi = "3f67787d6399449802b3d820607b790d";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;

const Profile = () => {
  const [shareCount, setShareCount] = useState(30);

  // -----------------------------------------------
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [comment, setComment] = useState({ id: null, value: "" });
  const [openModal, setOpenModal] = useState({ id: "", value: false });
  const [comments, setComments] = useState([]);
  const [videoInput, setVideoInput] = useState(false);
  const [videoLink, setVideoLink] = useState(null);

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
    const post = userPosts.find((post) => post._id == openModal.id);
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
            setUserPosts([...userPosts, res.data.post]);
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

  useEffect(() => {
    if (user) {
      axios.get(`/api/user/post?id=${user._id}`).then((res) => {
        setUserPosts(res.data.post);
      });
    }
  }, [user]);

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
        const post = userPosts.find((post) => post._id == postId);
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
        const post = userPosts.find((post) => post._id == postId);
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
        let post = userPosts.find((post) => post._id == id);
        const liked = post.like.includes(user._id);
        if (liked) {
          const restLike = post.like.filter((l) => l != user._id);
          post.like = [...restLike];
          setUserPosts([...userPosts]);
        } else {
          post.like.push(user._id);
          setUserPosts([...userPosts]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePostDelete = (id) => {
    axios
      .delete(`/api/user/post?id=${id}`)
      .then((res) => {
        setUserPosts(userPosts.filter((post) => post._id != id));
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <DashboardLayout>
      <div className=" top-0 w-[80%] mx-auto">
        <div className="mb-5 w-full">
          <div className="text-center bg-[#160030] text-[#A300B0] p-8 rounded-lg">
            <div className="avatar mb-4">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto">
                <img
                  src={user?.profilePic ? user.profilePic : "/images/user.png"}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Name: {user?.name}</h2>

            <div className="flex items-center mb-2">
              <MdEmail className="text-lg mr-2" />
              <h2 className="text-lg">Email: {user?.email} </h2>
            </div>
            <div className="flex items-center mb-2">
              <FaLocationDot className="text-lg mr-2" />
              <h2 className="text-lg mb-2">Address: {user?.location} </h2>
            </div>
            <div className="flex items-center mb-2">
              <BiSolidPhoneCall className="text-lg mr-2" />
              <h2 className="text-lg mb-2">Phone: {user?.mobileNumber} </h2>
            </div>
            <div className="flex items-center mb-2">
              <HiAcademicCap className="text-lg mr-2" />
              <h2 className="text-lg mb-2">Education: {user?.education} </h2>
            </div>
            <div className="flex items-center mb-2">
              <GrUserWorker className="text-lg mr-2" />
              <h2 className="text-lg mb-2">Workplace: {user?.recentJob} </h2>
            </div>
            <div className="flex items-center mb-2">
              <FaLinkedin className="text-lg mr-2" />
              <h2 className="text-lg mb-2">LinkedIn: {user?.linkedIn} </h2>
            </div>
            <Link href={"/dashboard/settings&privacy"}>
              <div className="flex items-center justify-center gap-5 bg-[#A300B0] px-12 py-2 w-[50%] mx-auto rounded-md text-white font-bold">
                <FaEdit className="text-lg font-bold" />
                <span>Edit your profile</span>
              </div>
            </Link>
          </div>
        </div>

        <div className=" bg-[#160030] text-[#A300B0] p-2 rounded-md flex items-start justify-between">
          <div className="pd-left">
            <div className="pd-row flex justify-center items-center">
              <img
                src={user?.profilePic ? user.profilePic : "/images/user.png"}
                className=" pd-image w-20 mr-5 rounded-md"
                alt="User Profile"
              />
              <div>
                <h3 className="text-lg mt-4 font-semibold">{user?.name}</h3>
                <p className="text-sm">120 Friends</p>
              </div>
            </div>
          </div>

          <div className="pd-right">
            <div className="classroom-actions mt-16">
              <Link
                href={`/dashboard/friends/${user?._id}`}
                className="bg-blue-700 text-white border-0 outline-0 px-4 py-2 inline-flex items-center rounded-md cursor-pointer">
                <FaUserFriends className="text-lg mr-1" />
                Friends
              </Link>

              <button className=" mb-2 text-white border-0 outline-0 px-4 py-2 ml-2 inline-flex items-center rounded-md cursor-pointer bg-blue-700 ">
                <Link
                  href="/Classroom"
                  className="text-white flex items-center">
                  <SiGoogleclassroom className="text-lg mr-1" />
                  Your Classroom
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-basis-47 ] mt-4">
          <div className="w-full bg-[#160030] text-[#A300B0] rounded p-5 ">
            <div className="flex items-center">
              <img
                src={user?.profilePic ? user.profilePic : "/images/user.png"}
                className="w-12 h-12 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold mb-0 text-gray-700">{user?.name}</p>
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
                  <img
                    src={filePreview}
                    alt=""
                    className="w-[200px] h-[200px]"
                  />
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

          {userPosts.length > 0
            ? userPosts.map((post) => {
                return (
                  <div className="relative bg-[#160030] text-[#A300B0] rounded p-4 my-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={
                            user?.profilePic
                              ? user.profilePic
                              : "/images/user.png"
                          }
                          className="w-10 h-10 rounded-full mr-2"
                        />
                        <div>
                          <p className="font-semibold mb-0 text-white">
                            {user?.name}
                          </p>
                          <span className="text-xs text-gray-500">
                            {dateFormat(post.createdAt)}
                          </span>
                        </div>
                      </div>
                      <a href="#" className="text-gray-700">
                        <i className="fas fa-ellipsis-v"></i>
                      </a>
                    </div>
                    <p className="text-gray-500 text-lg mb-5">{post.caption}</p>
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
                    <div className=" flex items-center justify-between border-b py-2 border-t">
                      <div className="flex items-center space-x-20 ">
                        <button
                          type="button"
                          onClick={() => handleLike(post._id)}
                          className="flex items-center ">
                          <BiSolidLike
                            className={`text-lg mr-2 ${
                              post.like.includes(user._id) ? "text-white" : ""
                            } `}
                          />
                          {post.like.length}
                        </button>
                        <button
                          className="flex items-center "
                          onClick={() =>
                            setOpenModal({ id: post._id, value: true })
                          }>
                          <FaCommentAlt className="text-lg mr-2" />
                          {post.comments.length}
                        </button>
                        <div className="flex items-center">
                          <FaShare className="text-lg mr-2" />
                          {shareCount}
                        </div>
                      </div>
                    </div>
                    <div className="my-3 flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <img
                          src={
                            user?.profilePic
                              ? user.profilePic
                              : "/images/user.png"
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
                          className="bg-blue-500 p-1 rounded-lg cursor-pointer"
                        />
                      </form>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePostDelete(post._id)}
                      className="absolute right-5 top-5 text-2xl text-red-500">
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                );
              })
            : "No post"}
          <button
            type="button"
            className="load-more-btn bg-blue-500 text-white p-2 rounded">
            Load More
          </button>
        </div>
        <CommentModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          comments={comments}
          setComments={setComments}
          handleDeleteComment={handleDeleteComment}
        />
      </div>
    </DashboardLayout>
  );
};

export default Profile;

// const Newsflash = () => {
//   const [likeCount, setLikeCount] = useState(120);
//   const [dislikeCount, setDislikeCount] = useState(20);
//   const [commentCount, setCommentCount] = useState(80);
//   const [shareCount, setShareCount] = useState(30);

//   const handleLike = () => {
//     setLikeCount((prevCount) => prevCount + 1);
//   };

//   const handleDislike = () => {
//     setDislikeCount((prevCount) => prevCount + 1);
//   };

//   const handleComment = () => {
//     setCommentCount((prevCount) => prevCount + 1);
//   };

//   const handleShare = () => {
//     setShareCount((prevCount) => prevCount + 1);
//   };

//   return (
//     <div className="flex-basis-47 bg-gray-200">
//       <div className="w-full bg-white rounded p-5 text-gray-700">
//         <div className="flex items-center">
//           <img
//             src="/images/profile-pic.jpg"
//             className="w-12 h-12 rounded-full mr-2"
//           />
//           <div>
//             <p className="font-semibold mb-0 text-gray-700">Username</p>
//             <small className="text-xs">
//               Public <i className="fas fa-caret-down"></i>
//             </small>
//           </div>
//         </div>

//         <div className="pl-14 pt-5">
//           <textarea
//             rows="3"
//             placeholder="Share your thoughts, with your community"
//             className="w-full border-0 outline-none border-b border-gray-300 bg-transparent resize-none"></textarea>

//           <div className="add-post-links mt-2 flex">
//             <label
//               for="video-upload"
//               className="flex items-center text-gray-700 mr-6 cursor-pointer">
//               <input
//                 type="file"
//                 id="video-upload"
//                 className="hidden"
//                 accept="video/*"
//               />
//               <PiVideoFill className="text-lg mr-2" />
//               <span className="text-lg mr-2">Videos</span>
//             </label>

//             <label
//               for="photo-upload"
//               className="flex items-center text-gray-700 mr-6 cursor-pointer">
//               <input
//                 type="file"
//                 id="photo-upload"
//                 className="hidden"
//                 accept="image/*"
//               />
//               <MdPhotoCamera className="text-lg mr-2" />
//               <span className="text-lg mr-2">Photos</span>
//             </label>

//             <label
//               for="document-upload"
//               className="flex items-center text-gray-700 cursor-pointer">
//               <input
//                 type="file"
//                 id="document-upload"
//                 className="hidden"
//                 accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx"
//               />
//               <HiMiniDocumentPlus className="text-lg mr-2" />
//               <span className="text-lg mr-2">Documents</span>
//             </label>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white rounded p-4 my-5">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <img
//               src="/images/profile-pic.jpg"
//               className="w-10 h-10 rounded-full mr-2"
//             />
//             <div>
//               <p className="font-semibold mb-0 text-gray-700">Username</p>
//               <span className="text-xs text-gray-500">
//                 September 22, 2023, 23:19 pm
//               </span>
//             </div>
//           </div>
//           <a href="#" className="text-gray-700">
//             <i className="fas fa-ellipsis-v"></i>
//           </a>
//         </div>
//         <p className="text-gray-500 text-lg mb-5">
//           Welcome to our open learning platform{" "}
//           <span className="text-gray-700 font-semibold">EduQuanta</span>
//           Spread your thoughts to our community.
//           <a href="#" className="text-blue-500">
//             #Easy Tutorials
//           </a>
//           <a href="#" className="text-blue-500">
//             #e-learning platform
//           </a>
//         </p>
//         <img src="/images/feed-image.png" className="w-full rounded mb-2" />
//         <div className=" flex items-center justify-between">
//           <div className="flex space-x-20 ">
//             <div className="flex items-center mr-5 mb-2" onClick={handleLike}>
//               <BiSolidLike className="text-lg mr-2" />
//               {likeCount}
//             </div>
//             <div
//               className="flex items-center mr-5 mb-2"
//               onClick={handleDislike}>
//               <BiSolidDislike className="text-lg mr-2" />
//               {dislikeCount}
//             </div>
//             <div
//               className="flex items-center mr-5 mb-2"
//               onClick={handleComment}>
//               <FaCommentAlt className="text-lg mr-2" />
//               {commentCount}
//             </div>
//             <div className="flex items-center mr-5 mb-2" onClick={handleShare}>
//               <FaShare className="text-lg mr-2" />
//               {shareCount}
//             </div>
//           </div>
//           <div className="flex items-center">
//             <img
//               src="/images/profile-pic.jpg"
//               className="w-5 h-5 rounded-full mr-2"
//             />
//             <i className="fa-solid fa-caret-down"></i>
//           </div>
//         </div>
//       </div>
//       <button
//         type="button"
//         className="load-more-btn bg-blue-500 text-white p-2 rounded">
//         Load More
//       </button>
//     </div>
//   );
// };

// export default Newsflash;
