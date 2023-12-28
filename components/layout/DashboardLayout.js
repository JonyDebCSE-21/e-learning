import React, { useEffect } from "react";
import Header from "../shared/Navbar/Header";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch(setUser(JSON.parse(user)));
  }, []);

  // useEffect(() => {
  //   // const user = localStorage.getItem("user");
  //   // console.log(user);
  //   // if (user) {
  //   //   axios.get(`/api/user/user?id=${user._id}`).then((res) => {
  //   //     dispatch(setUser(res.data.user));
  //   //   });
  //   // }
  //   const fetchData = async () => {
  //     axios.get(`/api/user/user?id=${user._id}`).then((res) => {
  //       dispatch(setUser(res.data.user));
  //     });
  //   };
  //   // if (user) {
  //   //   setInterval(function () {
  //   //     axios.get(`/api/user/user?id=${user._id}`).then((res) => {
  //   //       dispatch(setUser(res.data.user));
  //   //     });
  //   //   }, 5000);
  //   // }
  //   fetchData();
  //   const intervalId = setInterval(fetchData, 10000);

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);
  // if (user) {
  //   setInterval(function () {
  //     axios.get(`/api/user/user?id=${user._id}`).then((res) => {
  //       dispatch(setUser(res.data.user));
  //     });
  //   }, 5000);
  // }

  return (
    <>
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  p-12">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
          {children}
        </div>
        <div className="drawer-side bg-slate-400">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <Link
              className="hover:bg-common-button px-2 py-3"
              href="/dashboard/profile">
              Profile
            </Link>
            <Link
              className="hover:bg-common-button px-2 py-3"
              href="/dashboard/yourCourses">
              Your Course
            </Link>
            <Link
              className="hover:bg-common-button px-2 py-3"
              href="/dashboard/addCourse">
              Add Course
            </Link>
            <Link
              className="hover:bg-common-button px-2 py-3"
              href="/dashboard/addProduct">
              Add Product
            </Link>
            <Link
              className="hover:bg-common-button px-2 py-3"
              href="/dashboard/settings&privacy">
              Settings & Privacy
            </Link>
            <Link
              className="hover:bg-common-button px-2 py-3"
              href="/dashboard/userFeedback">
              User Feedback
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
