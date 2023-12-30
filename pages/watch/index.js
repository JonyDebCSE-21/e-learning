import Layout from "@/components/layout/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt, FaShare } from "react-icons/fa";

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

  return (
    <Layout>
      <div>
        {videoLinks.map((post) => {
          return (
            <div className="my-5 w-1/2 mx-auto">
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
                      <p className="font-semibold mb-0 text-white">
                        {post.user?.name}
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
                {/* <img
                  src={post.photos}
                  className=" rounded mb-3 w-1/2 mx-auto h-[600px]"
                /> */}
                <iframe
                  width="560"
                  height="315"
                  src={post.videos}
                  title="YouTube video player"
                  className="my-3"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
                <div className=" flex items-center justify-between border-b py-2 border-t">
                  <div className="flex items-center space-x-20 ">
                    <div className="flex items-center ">
                      <BiSolidLike className="text-lg mr-2" />
                      30
                    </div>
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
                      // onChange={(e) => {
                      //   setComment({ id: post._id, value: e.target.value });
                      // }}
                      // value={comment.id == post._id ? comment.value : ""}
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
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Watch;
