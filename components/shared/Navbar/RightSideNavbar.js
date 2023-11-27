import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { IoLogoDropbox } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";

const RightSideNavbar = () => {
  const [showNav, setShowNav] = useState(true);
  return (
    <div className="bg-gray-800 h-full text-white mt-0.5 flex-none top-20 p-4 rounded-md">
      <div className="sidebar-title flex items-center justify-between mb-18">
        <h4 className="text-2xl font-bold">Events</h4>
        <a href="#" className="text-blue-500 hover:underline">
          See All
        </a>
      </div>

      <div className="event flex gap-2 font-sans text-base mb-5">
        <div className="left-event border-radius-10 w-60 mr-15 pt-10 text-center overflow-hidden">
          <h3 className="text-2xl font-bold mb-2">22</h3>
          <span className=" w-full bg-blue-500 text-white text-xs p-1 my-2">
            September
          </span>
        </div>
        <div className="right-event">
          <h4 className="text-base font-bold">Programming Fest</h4>
          <p>
            <MdLocationPin className="text-lg mr-2" />
            <span class="text-lg mr-2"> Mirpur, Dhaka</span>
          </p>
          <a href="#" className="text-blue-500 hover:underline">
            More Info
          </a>
        </div>
      </div>

      <div className="event flex gap-2 font-sans text-base mb-5">
        <div className="left-event border-radius-10 w-60 mr-15 pt-10 text-center overflow-hidden">
          <h3 className="text-2xl font-bold mb-2">23</h3>
          <span className=" w-full bg-blue-500 text-white text-xs p-1 my-2">
            September
          </span>
        </div>
        <div className="right-event">
          <h4 className="text-base font-bold">Book Fair</h4>
          <p>
            <MdLocationPin className="text-lg mr-2" />
            <span class="text-lg mr-2">Shilpokola Academy, Chattogram</span>
          </p>
          <a href="#" className="text-blue-500 hover:underline">
            More Info
          </a>
        </div>
      </div>

      <div className="sidebar-title my-7">
        <h4 className="text-xl font-bold">Advertisement</h4>
        <a href="#" className="text-blue-500 hover:underline">
          Close
        </a>
      </div>
      <img
        src="/images/advertisement.png"
        alt="Advertisement"
        className="sidebar-ads w-full mb-20 rounded-md"
      />
    </div>
  );
};

export default RightSideNavbar;
