import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const imgStorageApi = "3f67787d6399449802b3d820607b790d";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;
const UpdateUserForm = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [recentJob, setRecentJob] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const handleUpdateProfile = (ev) => {
    ev.preventDefault();
    const data = {
      mobileNumber,
      location,
      education,
      recentJob,
      linkedIn,
    };
    const user = JSON.parse(localStorage.getItem("user"));
    const file = ev.target.images.files[0];
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
            .put("/api/user/user", {
              userId: user._id,
              mobileNumber,
              location,
              education,
              recentJob,
              linkedIn,
              profilePic: data?.data.display_url,
            })
            .then((res) => {
              dispatch(setUser(res.data.user));
              localStorage.setItem("user", JSON.stringify(res.data.user));
              toast.success("User Updated Successfully");
            });
        }
      });
  };
  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="grid grid-cols-2 ">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="number"
            placeholder="Enter Your Number"
            className="outline-none px-3 py-2 rounded-sm w-full max-w-xs mt-1 bg-gray-400 text-black"
            name="phone"
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            placeholder="Your Address"
            className=" outline-none px-3 py-2 rounded-sm  w-full max-w-xs mt-1 bg-gray-400 text-black"
            name="address"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Education
          </label>
          <input
            type="text"
            placeholder="Your Last Education"
            className=" outline-none px-3 py-2 rounded-sm w-full max-w-xs mt-1 bg-gray-400 text-black"
            name="education"
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Workplace
          </label>
          <input
            type="text"
            placeholder="Your Rcent Job"
            className="outline-none px-3 py-2 rounded-sm w-full max-w-xs mt-1 bg-gray-400 text-black"
            name="Job"
            onChange={(e) => setRecentJob(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            type="text"
            placeholder="Your LinkedIn ID Link"
            className="outline-none px-3 py-2 rounded-sm w-full max-w-xs mt-1 bg-gray-400 text-black"
            name="linkedin"
            onChange={(e) => setLinkedIn(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <input
            type="file"
            className="outline-none px-3 py-2 rounded-sm w-full max-w-xs mt-1 bg-gray-400 text-black"
            name="images"
          />
        </div>
      </div>
      <button
        className="btn w-full max-w-xs bg-blue-500 text-white hover:bg-blue-700"
        type="submit">
        UPDATE PROFILE
      </button>
    </form>
  );
};

export default UpdateUserForm;
