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

const Profile = () => {
  const [likeCount, setLikeCount] = useState(120);
  const [dislikeCount, setDislikeCount] = useState(20);
  const [commentCount, setCommentCount] = useState(80);
  const [shareCount, setShareCount] = useState(30);
  const [userProfile, setUserProfile] = useState({});
  const user = useSelector((state) => state.userReducer.user);

  console.log("user", user);

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
    if (user?.email) {
      axios
        .get(`/api/user/userProfile?userEmail=${user.email}`)
        .then((res) => setUserProfile(res.data.user));
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
                  src={userProfile.profilePic}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Name: {userProfile?.userName}
            </h2>

            <div className="flex items-center mb-2">
              <MdEmail className="text-lg mr-2" />
              <h2 className="text-lg">Email: {userProfile?.userEmail} </h2>
            </div>
            <div className="flex items-center mb-2">
              <FaLocationDot className="text-lg mr-2" />
              <h2 className="text-lg mb-2">
                Address: {userProfile?.location}{" "}
              </h2>
            </div>
            <div className="flex items-center mb-2">
              <BiSolidPhoneCall className="text-lg mr-2" />
              <h2 className="text-lg mb-2">
                Phone: {userProfile?.mobileNumber}{" "}
              </h2>
            </div>
            <div className="flex items-center mb-2">
              <HiAcademicCap className="text-lg mr-2" />
              <h2 className="text-lg mb-2">
                Education: {userProfile?.education}{" "}
              </h2>
            </div>
            <div className="flex items-center mb-2">
              <GrUserWorker className="text-lg mr-2" />
              <h2 className="text-lg mb-2">
                Workplace: {userProfile?.recentJob}{" "}
              </h2>
            </div>
            <div className="flex items-center mb-2">
              <FaLinkedin className="text-lg mr-2" />
              <h2 className="text-lg mb-2">
                LinkedIn: {userProfile?.linkedIn}{" "}
              </h2>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <UpdateUserForm />
          </div>
        </div>

        <div className=" bg-white p-2 rounded-md flex items-start justify-between">
          <div className="pd-left">
            <div className="pd-row flex items-start">
              <img
                src="/images/profile-pic.jpg"
                className=" pd-image w-20 mr-5 rounded-md"
                alt="User Profile"
              />
              <div>
                <h3 className="text-lg mt-4 font-semibold">Username</h3>
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
                src="/images/profile-pic.jpg"
                className="w-12 h-12 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold mb-0 text-gray-700">Username</p>
                <small className="text-xs">
                  Public <i className="fas fa-caret-down"></i>
                </small>
              </div>
            </div>

            <div className="pl-14 pt-2">
              <textarea
                rows="2"
                placeholder="Share your thoughts, with your community"
                className="w-full border-0 outline-none border-b border-gray-500 bg-transparent resize-none"></textarea>

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
            </div>
          </div>
          <div className="bg-white rounded p-4 my-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="/images/profile-pic.jpg"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold mb-0 text-gray-700">Username</p>
                  <span className="text-xs text-gray-500">
                    September 22, 2023, 23:19 pm
                  </span>
                </div>
              </div>
              <a href="#" className="text-gray-700">
                <i className="fas fa-ellipsis-v"></i>
              </a>
            </div>
            <p className="text-gray-500 text-lg mb-5">
              Welcome to our open learning platform{" "}
              <span className="text-gray-700 font-semibold">EduQuanta</span>
              Spread your thoughts to our community.
              <a href="#" className="text-blue-500">
                #Easy Tutorials
              </a>
              <a href="#" className="text-blue-500">
                #e-learning platform
              </a>
            </p>
            <img src="/images/feed-image.png" className="w-full rounded mb-2" />
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
                  src="/images/profile-pic.jpg"
                  className="w-5 h-5 rounded-full mr-2"
                />
                <i className="fa-solid fa-caret-down"></i>
              </div>
            </div>
          </div>
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
