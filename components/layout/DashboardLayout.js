import React, { useEffect } from "react";
import Header from "../shared/Navbar/Header";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice/userSlice";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch(setUser(JSON.parse(user)));
  }, []);
  return (
    <>
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
          <p>Welcome to your Dashboard</p>
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <Link
              className="hover:bg-common-button px-2 py-3"
              href="/dashboard/addCourse">
              Add Course
            </Link>
            <Link
              className="hover:bg-common-button px-2 py-3"
              href="/dashboard/profile">
              Profile
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
