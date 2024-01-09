import React, { useEffect } from "react";
import Header from "../shared/Navbar/Header";
import Link from "next/link";
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
              className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md text-base px-2 py-3"
              href="/dashboard/profile">
              Profile
            </Link>
            <Link
              className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
              href="/dashboard/yourCourses">
              Your Course
            </Link>
            <Link
              className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
              href="/dashboard/yourProduct">
              Your Product
            </Link>

            <Link
              className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
              href="/dashboard/settings&privacy">
              Settings & Privacy
            </Link>
            {user && user.role == "admin" && (
              <>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
                  href="/dashboard/userFeedback">
                  User Feedback
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
                  href="/dashboard/addCourse">
                  Add Course
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
                  href="/dashboard/addProduct">
                  Add Product
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
                  href="/dashboard/allProduct">
                  All Product
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
                  href="/dashboard/allCourse">
                  All Course
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
                  href="/dashboard/createEvent">
                  Create Events
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
                  href="/dashboard/events">
                  All Events
                </Link>
                <Link
                  className="hover:border hover:border-[#D700E2] hover:p-2 hover:rounded-md px-2 py-3"
                  href="/dashboard/allUser">
                  All User
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
