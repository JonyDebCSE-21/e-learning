import React, { useEffect } from "react";
import Input from "../Input";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { CgMenuGridO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import { BiNews } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { GoVideo } from "react-icons/go";
import { MdEventRepeat } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { IoIosCreate } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { MdNotificationImportant } from "react-icons/md";
import { setCart } from "@/redux/slice/cartSlice/cartSlice";
import axios from "axios";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const cart = useSelector((state) => state.cartReducer.cart);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch(setUser(JSON.parse(user)));
  }, []);

  useEffect(() => {
    const userL = localStorage.getItem("user");
    const userParsed = JSON.parse(userL);

    if (userL) {
      axios.get(`/api/user/cart?id=${userParsed._id}`).then((res) => {
        dispatch(setCart(res.data.cart));
      });
    }
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     axios.get(`/api/user/user?id=${user._id}`).then((res) => {
  //       dispatch(setUser(res.data.user));
  //     });
  //   }
  // }, []);

  return (
    <div
      className={`nav flex items-center justify-between ${
        router.pathname.includes("dashboard") && "bg-[#030014] text-white"
      } bg-blue-700 px-5 py-1 sticky top-0 z-50`}>
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/images/EQ-logo.png"
              alt="Logo"
              p
              className="h-12 w-auto"
            />
            <p className="text-white text-xs ml-2">
              A hassle-free learning boundary
            </p>
          </Link>
        </div>

        <Input />

        <div className="flex items-center mb-2">
          <Link href="/cart" className="text-white flex items-center">
            <FaShoppingCart className="text-lg mr-1" />
            <div className="relative ">
              <h2 className="text-lg mb-0">Cart</h2>
              <span className="absolute top-[-10px] right-[-10px] text-black ">
                {cart && cart[0]?.totalQuantity ? cart[0].totalQuantity : "0"}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center mb-2">
          <Link href="/webstore" className="text-white flex items-center">
            <FaShoppingCart className="text-lg mr-1" />
            <h2 className="text-lg mb-0">Webstore</h2>
          </Link>
        </div>

        <div className="flex items-center mb-2">
          <Link href="/Classroom" className="text-white flex items-center">
            <SiGoogleclassroom className="text-lg mr-1" />
            <h2 className="text-lg mb-0">Classroom</h2>
          </Link>
        </div>
        {/* <div className="flex items-center mb-2">
          <Link href="/webstore/order" className="text-white flex items-center">
            <SiGoogleclassroom className="text-lg mr-1" />
            <h2 className="text-lg mb-0">Order</h2>
          </Link>
        </div> */}

        <div className="relative">
          <div className="dropdown dropdown-end h-12 rounded-full bg-white w-12 cursor-pointer transition-transform transform hover:scale-105">
            <label
              tabIndex={0}
              className="text-center text-black flex justify-center items-center h-full">
              <p className="text-2xl">
                <CgMenuGridO />
              </p>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-40 menu p-2 mt-1 shadow bg-black rounded-box w-52 text-white">
              <div className="settings-menu">
                <div id="dark-btn">
                  <span></span>
                </div>
                <div className="settings-menu-inner">
                  <li className="hover:bg-blue-700">
                    <Link href="/" className="text-white flex items-center">
                      <HiHome className="text-lg mr-1" />
                      <h2 className="text-sm mb-0">Home</h2>
                    </Link>
                  </li>
                  <hr />

                  <li className="hover:bg-blue-700">
                    <Link
                      href="/webstore"
                      className="text-white flex items-center">
                      <FaShoppingCart className="text-lg mr-1" />
                      <h2 className="text-sm mb-0">Webstore</h2>
                    </Link>
                  </li>
                  <hr />
                  <li className="hover:bg-blue-700">
                    <Link
                      href="/newsflash"
                      className="text-white flex items-center">
                      <BiNews className="text-lg mr-1" />
                      <h2 className="text-sm mb-0">Newsflash</h2>
                    </Link>
                  </li>
                  <hr />
                  <li className="hover:bg-blue-700">
                    <Link
                      href="/watch"
                      className="text-white flex items-center">
                      <GoVideo className="text-lg mr-1" />
                      <h2 className="text-sm mb-0">Watch</h2>
                    </Link>
                  </li>
                  <hr />
                  <li className="hover:bg-blue-700">
                    <Link href="#" className="text-white flex items-center">
                      <MdEventRepeat className="text-lg mr-1" />
                      <h2 className="text-sm mb-0">Events</h2>
                    </Link>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="dropdown dropdown-end h-12 rounded-full bg-white w-12 cursor-pointer transition-transform transform hover:scale-105">
            <label
              tabIndex={0}
              className="text-center text-black flex justify-center items-center h-full">
              <p className="text-2xl">
                <MdNotificationImportant />
              </p>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-40 menu p-2 mt-1 shadow bg-black rounded-box w-52 text-white">
              <div class="settings-menu">
                <div id="dark-btn">
                  <span></span>
                </div>
                <div class="settings-menu-inner">
                  <li className="hover:bg-blue-700">
                    <Link href="" className="text-white flex items-center">
                      <h2 className="text-sm mb-0">Notifications</h2>
                    </Link>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="relative">
          <div className="dropdown dropdown-end h-12 rounded-full bg-white w-12 cursor-pointer transition-transform transform hover:scale-105">
            <label
              tabIndex={0}
              className="text-center cursor-pointer text-black h-full flex justify-center items-center">
              <FaUser />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-40 menu p-2 mt-1 shadow bg-black rounded-box w-52 text-white">
              <div className="settings-menu">
                <div id="dark-btn">
                  <span></span>
                </div>
                <div className="settings-menu-inner">
                  {user && (
                    <>
                      <li className="hover:bg-blue-700">
                        <Link
                          href="/dashboard/profile"
                          className="text-white flex items-center">
                          <MdDashboard className="text-lg mr-1" />
                          <h2 className="text-sm mb-0">Your Dashboard</h2>
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-blue-700">
                        <Link
                          href="/dashboard/profile"
                          className="text-white flex items-center">
                          <CgProfile className="text-lg mr-1" />
                          <h2 className="text-sm mb-0">See Your Profile</h2>
                        </Link>
                      </li>
                      <hr />
                    </>
                  )}
                  <li className="hover:bg-blue-700">
                    <Link
                      href="/dashboard/settings&privacy"
                      className="text-white flex items-center">
                      <IoSettingsSharp className="text-lg mr-1" />
                      <h2 className="text-sm mb-0">Settings & Privacy</h2>
                    </Link>
                  </li>

                  <hr />
                  <li className="hover:bg-blue-700">
                    <Link
                      href="/feedback"
                      className="text-white flex items-center">
                      <MdOutlineFeedback className="text-lg mr-1" />
                      <h2 className="text-sm mb-0">Give Feedback</h2>
                    </Link>
                  </li>
                  <hr />

                  {!user && (
                    <>
                      {" "}
                      <li className="hover:bg-blue-700">
                        <Link
                          href="/auth/Signin"
                          className="text-white flex items-center">
                          <PiSignInBold className="text-lg mr-1" />
                          <h2 className="text-sm mb-0">Sign in</h2>
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-blue-700">
                        <Link
                          href="/auth/Signup"
                          className="text-white flex items-center">
                          <IoIosCreate className="text-lg mr-1" />
                          <h2 className="text-sm mb-0">Sign Up</h2>
                        </Link>
                      </li>
                    </>
                  )}
                  {/* <li className="hover:bg-blue-700">
                    <Link href="#" className="text-white flex items-center">
                      <CgLogOut className="text-lg mr-1" />
                      <h2 className="text-sm mb-0">Log Out</h2>
                    </Link>
                  </li> */}
                  {user && (
                    <>
                      <hr />
                      <li
                        onClick={handleLogout}
                        className="hover:bg-blue-700 px-4 py-2">
                        <p href="#" className="text-white flex items-center">
                          <CgLogOut className="text-lg mr-1" />
                          <p className="text-sm mb-0">Log Out</p>
                        </p>
                      </li>
                    </>
                  )}
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
