import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { HiAcademicCap } from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";

import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { PiVideoFill } from "react-icons/pi";
import { MdPhotoCamera } from "react-icons/md";
import { HiMiniDocumentPlus } from "react-icons/hi2";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUserFriends } from "react-icons/fa";
import profilePic from "@/public/images/propic.jpg";
import UpdateUserForm from "@/components/form/UpdateUserForm";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const imgStorageApi = "3f67787d6399449802b3d820607b790d";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;

const Profile = () => {
  const [status, setStatus] = useState("");
  const [likeCount, setLikeCount] = useState(120);
  const [dislikeCount, setDislikeCount] = useState(20);
  const [commentCount, setCommentCount] = useState(80);
  const [shareCount, setShareCount] = useState(30);
  const [userProfile, setUserProfile] = useState({});
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const user = useSelector((state) => state.userReducer.user);

  const handleLike = () => {
    setLikeCount((prevCount) => prevCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount((prevCount) => prevCount + 1);
  };

  const handleComment = () => {
    setCommentCount((prevCount) => prevCount + 1);
  };

  const handleShare = () => {
    setShareCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    // if (user?.email) {
    //   axios
    //     .get(`/api/user/userProfile?userEmail=${user.email}`)
    //     .then((res) => setUserProfile(res.data.user));
    // }
  }, [user]);

  const handleStatusPost = () => {
    // const data = {
    //   userEmail: user?.email,
    //   posts: {
    //     status: status,
    //   },
    // };
    // axios
    //   .put("api/user/userProfile", data)
    //   .then((res) => console.log(res.data));
  };
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
        if (data?.data) {
          axios
            .post("/api/user/post", {
              userId: user._id,
              caption: status,
              photos: data?.data.display_url,
            })
            .then((res) => {
              setUserPosts([...userPosts, res.data.post]);
              // dispatch(setUser(res.data.user));
              // localStorage.setItem("user", JSON.stringify(res.data.user));
              toast.success(res.data.message);
              setFilePreview(null);
              setStatus("");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  useEffect(() => {
    if (user) {
      axios.get(`/api/user/post?id=${user._id}`).then((res) => {
        setUserPosts(res.data.post);
      });
    }
  }, [user]);
  return (
    <DashboardLayout>
      <div className="bg-gray-200 top-0">
        <h2 className="text-3xl font-bold text-primary text-center my-5">
          Welcome to your Dashboard
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 p-8">
          <div className="text-center bg-gray-100 p-8 rounded-lg">
            <div className="avatar mb-4">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto">
                <img
                  src={
                    user?.profilePic ? user.profilePic : "/images/children.jpg"
                  }
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
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <UpdateUserForm />
          </div>
        </div>

        <div className=" bg-white p-2 rounded-md flex items-start justify-between">
          <div className="pd-left">
            <div className="pd-row flex justify-center items-center">
              <img
                src={
                  user?.profilePic ? user.profilePic : "/images/children.jpg"
                }
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
              <button
                type="button"
                className="bg-blue-700 text-white border-0 outline-0 px-4 py-2 inline-flex items-center rounded-md cursor-pointer">
                <FaUserFriends className="text-lg mr-1" />
                Friends
              </button>

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

        <div className="flex-basis-47 bg-gray-200 mt-4">
          <div className="w-full bg-white rounded p-5 text-gray-700">
            <div className="flex items-center">
              <img
                src={
                  user?.profilePic ? user.profilePic : "/images/children.jpg"
                }
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
              <div class="add-post-links flex">
                <label
                  for="video-upload"
                  class="flex items-center text-gray-700 mr-6 cursor-pointer">
                  <input
                    type="file"
                    id="video-upload"
                    class="hidden"
                    accept="video/*"
                  />
                  <PiVideoFill className="text-lg mr-2" />
                  <span class="text-lg mr-2">Videos</span>
                </label>

                <label
                  for="photo-upload"
                  class="flex items-center text-gray-700 mr-6 cursor-pointer">
                  <input
                    type="file"
                    id="photo-upload"
                    class="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const url = URL.createObjectURL(e.target.files[0]);
                      setFilePreview(url);
                      setFile(e.target.files[0]);
                    }}
                  />
                  <MdPhotoCamera className="text-lg mr-2" />
                  <span class="text-lg mr-2">Photos</span>
                </label>

                <label
                  for="document-upload"
                  class="flex items-center text-gray-700 cursor-pointer">
                  <input
                    type="file"
                    id="document-upload"
                    class="hidden"
                    accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx"
                  />
                  <HiMiniDocumentPlus className="text-lg mr-2" />
                  <span class="text-lg mr-2">Documents</span>
                </label>
              </div>
              <button
                onClick={handleStatusPost}
                className="bg-blue-700 px-5 py-2 mt-2 rounded text-white">
                Post
              </button>
            </form>
          </div>

          {userPosts.length > 0
            ? userPosts.map((post) => {
                return (
                  <div className="bg-white rounded p-4 my-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={
                            user?.profilePic
                              ? user.profilePic
                              : "/images/children.jpg"
                          }
                          className="w-10 h-10 rounded-full mr-2"
                        />
                        <div>
                          <p className="font-semibold mb-0 text-gray-700">
                            {user?.name}
                          </p>
                          <span className="text-xs text-gray-500">
                            {/* September 22, 2023, 23:19 pm */}
                            {post.createdAt}
                          </span>
                        </div>
                      </div>
                      <a href="#" className="text-gray-700">
                        <i className="fas fa-ellipsis-v"></i>
                      </a>
                    </div>
                    <p className="text-gray-500 text-lg mb-5">{post.caption}</p>
                    <img
                      src={post.photos}
                      className=" rounded mb-2 w-[300px]"
                    />
                    <div className=" flex items-center justify-between">
                      <div className="flex space-x-20 ">
                        <div
                          className="flex items-center mr-5 mb-2"
                          onClick={handleLike}>
                          <BiSolidLike className="text-lg mr-2" />
                          {likeCount}
                        </div>
                        <div
                          className="flex items-center mr-5 mb-2"
                          onClick={handleDislike}>
                          <BiSolidDislike className="text-lg mr-2" />
                          {dislikeCount}
                        </div>
                        <div
                          className="flex items-center mr-5 mb-2"
                          onClick={handleComment}>
                          <FaCommentAlt className="text-lg mr-2" />
                          {commentCount}
                        </div>
                        <div
                          className="flex items-center mr-5 mb-2"
                          onClick={handleShare}>
                          <FaShare className="text-lg mr-2" />
                          {shareCount}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <img
                          src={
                            user?.profilePic
                              ? user.profilePic
                              : "/images/children.jpg"
                          }
                          className="w-5 h-5 rounded-full mr-2"
                        />
                        <i className="fa-solid fa-caret-down"></i>
                      </div>
                    </div>
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

//           <div class="add-post-links mt-2 flex">
//             <label
//               for="video-upload"
//               class="flex items-center text-gray-700 mr-6 cursor-pointer">
//               <input
//                 type="file"
//                 id="video-upload"
//                 class="hidden"
//                 accept="video/*"
//               />
//               <PiVideoFill className="text-lg mr-2" />
//               <span class="text-lg mr-2">Videos</span>
//             </label>

//             <label
//               for="photo-upload"
//               class="flex items-center text-gray-700 mr-6 cursor-pointer">
//               <input
//                 type="file"
//                 id="photo-upload"
//                 class="hidden"
//                 accept="image/*"
//               />
//               <MdPhotoCamera className="text-lg mr-2" />
//               <span class="text-lg mr-2">Photos</span>
//             </label>

//             <label
//               for="document-upload"
//               class="flex items-center text-gray-700 cursor-pointer">
//               <input
//                 type="file"
//                 id="document-upload"
//                 class="hidden"
//                 accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx"
//               />
//               <HiMiniDocumentPlus className="text-lg mr-2" />
//               <span class="text-lg mr-2">Documents</span>
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
