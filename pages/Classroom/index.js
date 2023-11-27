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
  const [selectedFile, setSelectedFile] = useState(null);
  const [joinedClasses, setJoinedClasses] = useState(0);
  const [createdClasses, setCreatedClasses] = useState(0);

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

  return (
    <div className="classroom-container p-8">
      <img
        src="images/feed image.png"
        className="bg-gray-200 w-full h-44 rounded-md mb-14"
        alt="Classroom Cover"
      />

      <div className="profile-details bg-gray-200 p-5 rounded-md flex items-start justify-between">
        <div className="pd-left">
          <div className="pd-row flex items-start">
            <img
              src="your-profile-image-url.jpg"
              className="pd-image w-20 mr-5 rounded-md"
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

      <div className="upload-section mt-8">
        <label
          htmlFor="uploadFile"
          className="block text-sm font-medium text-gray-700">
          Upload Photo/Video/Document
        </label>
        <input
          type="file"
          id="uploadFile"
          className="mt-1 p-2 border rounded-md"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Classroom;
