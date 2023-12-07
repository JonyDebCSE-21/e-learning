import React, { useState } from "react";

const JoinedCreatedCounts = ({ joinedCount, createdCount }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      <div className="bg-blue-500 text-white p-4 rounded-md text-center">
        <h3 className="text-lg font-semibold mb-2">Classes Joined</h3>
        <p className="text-2xl">{joinedCount}</p>
      </div>
      <div className="bg-green-500 text-white p-4 rounded-md text-center">
        <h3 className="text-lg font-semibold mb-2">Classes Created</h3>
        <p className="text-2xl">{createdCount}</p>
      </div>
    </div>
  );
};

const Classroom = () => {
  // Existing state variables
  const [selectedFile, setSelectedFile] = useState(null);
  const [joinedClasses, setJoinedClasses] = useState(0);
  const [createdClasses, setCreatedClasses] = useState(0);

  // New state variables for cover customization
  const colorOptions = ["#3498db", "#27ae60", "#f39c12", "#e74c3c", "#8e44ad"];
  const [coverColor, setCoverColor] = useState("#3498db"); // Default cover color
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleJoinClassroom = () => {
    const username = prompt("Enter your username:");
    if (username) {
      const newMember = {
        id: classMembers.length + 1,
        username,
        profileImage: "default-profile-image.jpg",
      };
      setClassMembers([...classMembers, newMember]);
      setJoinedClasses(joinedClasses + 1);
    }
  };

  const handleCreateClassroom = () => {
    const classroomName = prompt("Enter the classroom name:");
    if (classroomName) {
      // Handle classroom creation logic
      setCreatedClasses(createdClasses + 1);
    }
  };

  const handleColorChange = (color) => {
    setCoverColor(color);
  };

  const handleUploadButtonClick = () => {
    setShowUploadOptions(!showUploadOptions);
  };

  const handleCoverPhotoUpload = () => {
    setSelectedFile(null);
    setShowUploadOptions(false);
  };
  return (
    <div className="classroom-container bg-gray-200 p-8">
      <div className="cover photo">
        <div
          style={{ backgroundColor: coverColor }}
          className="w-full h-48 rounded-md mb- relative">
          <img
            src="/images/feed-image.png"
            className="w-full h-full object-cover rounded-md"
            alt="Classroom Cover"
          />
          {/* Customization Button */}
          <div className="absolute top-2 right-2">
            <button
              className="bg-gray-800 text-white px-2 py-1 rounded-md"
              onClick={handleUploadButtonClick}>
              Customize
            </button>
            {showUploadOptions && (
              <div className="mt-1 border rounded-mdabsolute top-8 right-0 bg-white p-2 rounded-md shadow-md">
                {/* Color Options */}
                <div className="mb-2">
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Color:
                  </span>
                  {colorOptions.map((color, index) => (
                    <button
                      key={index}
                      className="rounded-full h-6 w-6 mr-2"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}></button>
                  ))}
                </div>

                {/* Upload Photo */}
                <label
                  htmlFor="photo-upload"
                  className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2 block text-sm font-medium mb-2">
                  Upload Photo
                  <input
                    type="file"
                    id="photo-upload"
                    class="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            )}
          </div>
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
              <h3 className="text-2xl font-semibold">Username</h3>
              <p className="text-sm">120 Friends</p>
            </div>
          </div>
        </div>

        <div className="pd-right">
          <div className="classroom-actions mt-8">
            <button
              type="button"
              className="bg-green-500 text-white border-0 outline-0 px-4 py-2 inline-flex items-center rounded-md cursor-pointer"
              onClick={handleCreateClassroom}>
              Create Classroom
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white border-0 outline-0 px-4 py-2 inline-flex items-center rounded-md ml-3 cursor-pointer"
              onClick={handleJoinClassroom}>
              Join Classroom
            </button>
          </div>
        </div>
      </div>

      {/* Joined/Created Counts */}
      <JoinedCreatedCounts
        joinedCount={joinedClasses}
        createdCount={createdClasses}
      />

      <div className="upload-section mt-8 bg-white ">
        <label
          htmlFor="uploadFile"
          className="block text-sm font-medium text-gray-700">
          Upload Photo/Video/Document
        </label>
        <input
          type="file"
          id="uploadFile"
          className="mt-1 p-2 border rounded-md bg-orange-500"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Classroom;