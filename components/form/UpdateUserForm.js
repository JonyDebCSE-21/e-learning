import axios from "axios";
import React, { useState } from "react";

const imgStorageApi = "3f67787d6399449802b3d820607b790d";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;
const UpdateUserForm = () => {
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
    console.log("up form  image", ev.target.images.files[0]);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user", user);
    const file = ev.target.images.files[0];
    const formData = new FormData();
    formData.append("image", file);

    fetch(imgUploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.data);
        if (data?.data) {
          axios
            .post("/api/user/userProfile", {
              userId: user._id,
              userName: user.name,
              userEmail: user.email,
              userRole: user.role,
              mobileNumber,
              location,
              education,
              recentJob,
              linkedIn,
              profilePic: data?.data.display_url,
            })
            .then((res) => {
              console.log(res.data.userProfile);
            });
        }
      });
  };
  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          type="number"
          placeholder="Enter Your Number"
          className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
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
          className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
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
          className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
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
          className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
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
          className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
          name="linkedin"
          onChange={(e) => setLinkedIn(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <input
          type="file"
          className="input input-bordered w-full max-w-xs mt-1 bg-black text-white"
          name="images"
        />
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
