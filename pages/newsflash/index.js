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

const Newsflash = () => {
  const [posts, setPosts] = useState([]);

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
    axios
      .get("/api/user/post")
      .then((res) => {
        setPosts(res.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(posts);
  return (
    <Layout>
      <div className="flex-basis-47 bg-gray-200">
        <div className="w-full bg-white rounded p-5 text-gray-700">
          <div className="flex items-center">
            <img
              src={user?.profilePic ? user.profilePic : "/images/children.jpg"}
              className="w-12 h-12 rounded-full mr-2"
            />
            <div>
              <p className="font-semibold mb-0 text-gray-700">{user?.name}</p>
              <small className="text-xs">
                Public <i className="fas fa-caret-down"></i>
              </small>
            </div>
          </div>

          <div className="pl-14 pt-2">
            <textarea
              rows="2"
              placeholder="Share your thoughts, with your community"
              className="w-full border-0 outline-none border-b border-gray-500  bg-transparent resize-none"></textarea>

            <div className="add-post-links flex">
              <label
                for="video-upload"
                className="flex items-center text-gray-700 mr-6 cursor-pointer">
                <input
                  type="file"
                  id="video-upload"
                  className="hidden"
                  accept="video/*"
                />
                <PiVideoFill className="text-lg mr-2" />
                <span className="text-lg mr-2">Videos</span>
              </label>

              <label
                for="photo-upload"
                className="flex items-center text-gray-700 mr-6 cursor-pointer">
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/*"
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
              <button>Post</button>
            </div>
          </div>
        </div>
        {posts?.map((post) => (
          <div className="bg-white rounded p-4 my-5">
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
                  <p className="font-semibold mb-0 text-gray-700">
                    {post?.user?.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {dateFormat(post?.createdAt)}
                  </span>
                </div>
              </div>
              <a href="#" className="text-gray-700">
                <i className="fas fa-ellipsis-v"></i>
              </a>
            </div>
            <p className="text-gray-500 text-lg mb-5">
              {post?.caption}
              {/* <span className="text-gray-700 font-semibold">EduQuanta</span>
              Spread your thoughts to our community.
              <a href="#" className="text-blue-500">
                #Easy Tutorials
              </a>
              <a href="#" className="text-blue-500">
                #e-learning platform
              </a> */}
            </p>
            <img
              src={`${post?.photos ? post?.photos : "/images/feed-image.png"}`}
              className=" rounded mb-3 w-1/2 mx-auto h-[600px]"
            />
            <div className=" flex items-center justify-between">
              <div className="flex space-x-20 ">
                <div className="flex items-center mr-5 mb-2">
                  <BiSolidLike className="text-lg mr-2" />
                  23
                </div>

                <div className="flex items-center mr-5 mb-2">
                  <FaCommentAlt className="text-lg mr-2" />2
                </div>
                <div className="flex items-center mr-5 mb-2">
                  <FaShare className="text-lg mr-2" />4
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
        ))}
        <button
          type="button"
          className="load-more-btn bg-blue-500 text-white p-2 rounded">
          Load More
        </button>
      </div>
    </Layout>
  );
};

export default Newsflash;
