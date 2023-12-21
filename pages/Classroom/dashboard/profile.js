import React, { useEffect } from "react";
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
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  return (
    <div className="bg-gray-200 top-0">
      <h2 className="text-3xl font-bold text-primary text-center my-5">
        Welcome to your Dashboard
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 p-8">
        <div className="text-center bg-gray-100 p-8 rounded-lg">
          <div className="avatar mb-4">
            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto">
              <img src="#" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Name: </h2>
          <div className="flex items-center mb-2">
            <MdEmail className="text-lg mr-2" />
            <h2 className="text-lg">Email: </h2>
          </div>
          <div className="flex items-center mb-2">
            <FaLocationDot className="text-lg mr-2" />
            <h2 className="text-lg mb-2">Address: </h2>
          </div>
          <div className="flex items-center mb-2">
            <BiSolidPhoneCall className="text-lg mr-2" />
            <h2 className="text-lg mb-2">Phone: </h2>
          </div>
          <div className="flex items-center mb-2">
            <HiAcademicCap className="text-lg mr-2" />
            <h2 className="text-lg mb-2">Education: </h2>
          </div>
          <div className="flex items-center mb-2">
            <GrUserWorker className="text-lg mr-2" />
            <h2 className="text-lg mb-2">Workplace: </h2>
          </div>
          <div className="flex items-center mb-2">
            <FaLinkedin className="text-lg mr-2" />
            <h2 className="text-lg mb-2">LinkedIn: </h2>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="number"
                placeholder="Enter Your Number"
                className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
                name="phone"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                placeholder="Your Address"
                className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
                name="address"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <input
                type="text"
                placeholder="Your Last Education"
                className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
                name="education"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Workplace
              </label>
              <input
                type="text"
                placeholder="Your Rcent Job"
                className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
                name="Job"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="text"
                placeholder="Your LinkedIn ID Link"
                className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
                name="linkedin"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <input
                type="file"
                className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
                name="image"
              />
            </div>
            <button
              className="btn w-full max-w-xs bg-blue-500 text-white hover:bg-blue-700"
              type="submit">
              UPDATE PROFILE
            </button>
          </form>
        </div>
      </div>

      <div className="flex-basis-47 bg-gray-200">
        <div className="w-full bg-white rounded p-5 text-gray-700">
          <div className="flex items-center">
            <img src="#" className="w-12 h-12 rounded-full mr-2" />
            <div>
              <p className="font-semibold mb-0 text-gray-700">Username</p>
              <small className="text-xs">
                Public <i className="fas fa-caret-down"></i>
              </small>
            </div>
          </div>

          {/* Status post area */}
          <div className="pl-14 pt-5">
            <textarea
              rows="3"
              placeholder="Share your thoughts, with your community"
              className="w-full border-0 outline-none border-b border-gray-300 bg-transparent resize-none"
            />

            <div className="add-post-links mt-2 flex">
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
            </div>
          </div>
        </div>
        <div className="post-container bg-white rounded p-4 my-5">
          <div className=" post-row flex items-center justify-between">
            <div className="user-profile flex items-center">
              <img
                src="profile pic.jpg"
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
          <p className="post-text text-gray-500 text-lg mb-5">
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
          <img
            src="images/feed image.png"
            className="post-img w-full rounded mb-2"
          />
          <div className="post-row flex items-center justify-between">
            <div className="flex space-x-20 ">
              <div className="flex items-center mr-5 mb-2">
                <BiSolidLike className="text-lg mr-2" />
                120
              </div>
              <div className="flex items-center mr-5 mb-2">
                <BiSolidDislike className="text-lg mr-2" />
                20
              </div>
              <div className="flex items-center mr-5 mb-2">
                <FaCommentAlt className="text-lg mr-2" />
                80
              </div>
              <div className="flex items-center mr-5 mb-2">
                <FaShare className="text-lg mr-2" />
                30
              </div>
            </div>
            <div className="post-profile-icon flex items-center">
              <img
                src="profile pic.jpg"
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
  );
};

export default Profile;
