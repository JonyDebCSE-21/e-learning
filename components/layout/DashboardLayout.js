import React, { useEffect } from "react";
import Header from "../shared/Navbar/Header";
import Link from "next/link";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa6";
import { SiCoursera } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { MdEventRepeat } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
import { useRouter } from "next/router";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/Signin");
    }
  }, [user]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch(setUser(JSON.parse(user)));
  }, []);

  return (
    <>
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  p-12 bg-[#030014]">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
          {children}
        </div>
        <div
          style={{
            boxShadow: " 5px 0 10px rgba(0, 0, 0, 0.1)",
          }}
          className="drawer-side bg-[#030014] text-[#D700E2] border-r py-2 border-[#D700E2]">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <Link
              className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
              href="/dashboard/profile">
              <CgProfile className="ml-1 text-xl mr-2" />
              Profile
            </Link>
            <Link
              className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
              href="/dashboard/yourCourses">
              <FaBookReader className="ml-1 text-xl mr-2" />
              Your Course
            </Link>
            <Link
              className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
              href="/dashboard/yourProduct">
              <MdOutlineProductionQuantityLimits className="ml-1 text-xl mr-2" />
              Your Product
            </Link>
            <Link
              className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
              href="/dashboard/settings&privacy">
              <IoSettingsSharp className="ml-1 text-xl mr-2" />
              Settings & Privacy
            </Link>
            {user && user.role == "admin" && (
              <>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
                  href="/dashboard/addCourse">
                  <AiFillPlusCircle className="ml-1 text-xl mr-2" />
                  Add Course
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
                  href="/dashboard/allCourse">
                  <SiCoursera className="ml-1 text-xl mr-2" />
                  All Course
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
                  href="/dashboard/addProduct">
                  <AiFillPlusCircle className="ml-1 text-xl mr-2" />
                  Add Product
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
                  href="/dashboard/allProduct">
                  <FaProductHunt className="ml-1 text-xl mr-2" />
                  All Product
                </Link>

                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
                  href="/dashboard/createEvent">
                  <AiFillPlusCircle className="ml-1 text-xl mr-2" />
                  Create Events
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
                  href="/dashboard/events">
                  <MdEventRepeat className="ml-1 text-xl mr-2" />
                  All Events
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
                  href="/dashboard/allUser">
                  <PiUserListBold className="ml-1 text-xl mr-2" />
                  User List
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
                  href="/dashboard/userFeedback">
                  <VscFeedback className="ml-1 text-xl mr-2" />
                  User Feedback
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3 flex items-center"
                  href="/dashboard/settings&privacy">
                  <IoSettingsSharp className="ml-1 text-xl mr-2" />
                  Settings & Privacy
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
