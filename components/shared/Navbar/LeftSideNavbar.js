import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { IoLogoDropbox } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaUserFriends } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { useRouter } from "next/router";

const LeftSideNavbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [showPrimary, setShowPrimary] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showLeftNav, setShowLeftNav] = useState(false);
  const user = useSelector((state) => state.userReducer.user);

  const router = useRouter();
  return (
    <>
      {/* <button onClick={() => setShowLeftNav(!showLeftNav)}>Show</button>
      {showLeftNav && ( */}
      <div className="sticky top-0  h-full text-black mt-0.5 overflow-y-visible pt-3">
        <div
          onClick={() => {
            router.push("/dashboard/profile");
          }}
          className="flex items-center gap-4 cursor-pointer  px-[10px] py-[5px] h-10">
          <img
            className="w-10 h-10 rounded-full"
            src={user?.profilePic}
            alt=""
          />{" "}
          <span className="font-semibold">{user?.name}</span>
        </div>

        <div className="p-2">
          <div
            // onClick={() => router.push("/Classroom")}
            className="flex items-center gap-4 cursor-pointer hover:bg-blue-700 px-4 py-2">
            <FaUserFriends /> <span className="font-semibold">Friends</span>
          </div>
          {/* {showPrimary && (
            <div className="flex flex-col pl-4">
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-1</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-2</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-3</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-4</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-5</a>
              </li>
            </div>
          )} */}
          <div
            onClick={() => router.push("/Classroom")}
            className="flex items-center gap-4 cursor-pointer hover:bg-blue-700 px-4 py-2">
            <SiGoogleclassroom />{" "}
            <span className="font-semibold">Your Classroom</span>
          </div>
          {/* {showSecondary && (
            <div className="flex flex-col pl-4">
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-6</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-7</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-8</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-9</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Class-10</a>
              </li>
            </div>
          )} */}
          {/* <div className="flex items-center gap-4 cursor-pointer hover:bg-blue-700 px-4 py-2">
            <IoLogoDropbox />{" "}
            <span className="font-semibold">Higher Education</span>
          </div>
          <div
            onClick={() => setShowSkills(!showSkills)}
            className="flex items-center gap-4 cursor-pointer hover:bg-blue-700 px-4 py-2">
            <IoLogoDropbox /> <span className="font-semibold">Skills</span>
          </div>
          {showSkills && (
            <div className="flex flex-col pl-4">
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400 px-[10px] py-[3px] h-6">
                <a>C</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>C++</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>JAVA</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Javascript</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-400  px-[10px] py-[3px] h-6">
                <a>Python</a>
              </li>
            </div>
          )} */}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default LeftSideNavbar;
