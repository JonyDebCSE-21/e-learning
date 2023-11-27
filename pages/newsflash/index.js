// import React from "react";
// import { BiSolidLike } from "react-icons/bi";
// import { BiSolidDislike } from "react-icons/bi";
// import { FaCommentAlt } from "react-icons/fa";
// import { FaShare } from "react-icons/fa6";
// import { PiVideoFill } from "react-icons/pi";
// import { MdPhotoCamera } from "react-icons/md";
// import { HiMiniDocumentPlus } from "react-icons/hi2";

// const Newsflash = () => {
//   return (
//     <div className="flex-basis-47 bg-gray-200">
//       <div className="w-full bg-white rounded p-5 text-gray-700">
//         <div className="flex items-center">
//           <img src="#" className="w-12 h-12 rounded-full mr-2" />
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
//       <div className="post-container bg-white rounded p-4 my-5">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <img
//               src="profile pic.jpg"
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
//         <p className=" text-gray-500 text-lg mb-5">
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
//         <img
//           src="images/feed image.png"
//           className="post-img w-full rounded mb-2"
//         />
//         <div className="flex items-center justify-between">
//           <div className="flex space-x-20 ">
//             <div className="flex items-center mr-5 mb-2">
//               <BiSolidLike className="text-lg mr-2" />
//               120
//             </div>
//             <div className="flex items-center mr-5 mb-2">
//               <BiSolidDislike className="text-lg mr-2" />
//               20
//             </div>
//             <div className="flex items-center mr-5 mb-2">
//               <FaCommentAlt className="text-lg mr-2" />
//               80
//             </div>
//             <div className="flex items-center mr-5 mb-2">
//               <FaShare className="text-lg mr-2" />
//               30
//             </div>
//           </div>
//           <div className="flex items-center">
//             <img src="profile pic.jpg" className="w-5 h-5 rounded-full mr-2" />
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

import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { PiVideoFill } from "react-icons/pi";
import { MdPhotoCamera } from "react-icons/md";
import { HiMiniDocumentPlus } from "react-icons/hi2";

const Newsflash = () => {
  const [likeCount, setLikeCount] = useState(120);
  const [dislikeCount, setDislikeCount] = useState(20);
  const [commentCount, setCommentCount] = useState(80);
  const [shareCount, setShareCount] = useState(30);

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

  return (
    <div className="flex-basis-47 bg-gray-200">
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

        <div className="pl-14 pt-5">
          <textarea
            rows="3"
            placeholder="Share your thoughts, with your community"
            className="w-full border-0 outline-none border-b border-gray-300 bg-transparent resize-none"></textarea>

          <div class="add-post-links mt-2 flex">
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
        <img src="images/feed image.png" className="w-full rounded mb-2" />
        <div className=" flex items-center justify-between">
          <div className="flex space-x-20 ">
            <div className="flex items-center mr-5 mb-2" onClick={handleLike}>
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
            <div className="flex items-center mr-5 mb-2" onClick={handleShare}>
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
  );
};

export default Newsflash;
