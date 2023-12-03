import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { IoLogoDropbox } from "react-icons/io";

const LeftSideNavbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [showPrimary, setShowPrimary] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showLeftNav, setShowLeftNav] = useState(false);
  return (
    <>
      {/* <button onClick={() => setShowLeftNav(!showLeftNav)}>Show</button>
      {showLeftNav && ( */}
      <div className="sticky top-0 bg-gray-800 h-full text-white mt-0.5 overflow-y-visible ">
        <div className="flex items-center gap-4 cursor-pointer hover:bg-blue-700 px-[10px] py-[5px] h-10">
          <AiOutlineBars /> <span className="font-semibold">All Courses</span>
        </div>

        <>
          <div
            onClick={() => setShowPrimary(!showPrimary)}
            className="flex items-center gap-4 cursor-pointer hover:bg-blue-700 px-4 py-2">
            <IoLogoDropbox />{" "}
            <span className="font-semibold">Primary Education</span>
          </div>
          {showPrimary && (
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
          )}
          <div
            onClick={() => setShowSecondary(!showSecondary)}
            className="flex items-center gap-4 cursor-pointer hover:bg-blue-700 px-4 py-2">
            <IoLogoDropbox />{" "}
            <span className="font-semibold">Secondary Education</span>
          </div>
          {showSecondary && (
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
          )}
          <div className="flex items-center gap-4 cursor-pointer hover:bg-blue-700 px-4 py-2">
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
          )}
        </>
      </div>
      {/* )} */}
    </>
  );
};

export default LeftSideNavbar;
