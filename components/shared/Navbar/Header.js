import React from "react";
import Input from "../Input";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { CgMenuGridO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice/userSlice/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
  };

  return (
    <div className="nav flex items-center justify-between bg-blue-500 px-5 py-1 sticky top-0 z-50">
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
          <Link href="webstore" className="text-white flex items-center">
            <FaShoppingCart className="text-lg mr-2" />
            <h2 className="text-lg mb-0">Webstore</h2>
          </Link>
        </div>

        <div className="flex items-center mb-2">
          <Link href="Classroom" className="text-white flex items-center">
            <SiGoogleclassroom className="text-lg mr-2" />
            <h2 className="text-lg mb-0">Classroom</h2>
          </Link>
        </div>
        <div className="flex items-center mb-2">
          <Link href="OrderPage" className="text-white flex items-center">
            <SiGoogleclassroom className="text-lg mr-2" />
            <h2 className="text-lg mb-0">Order</h2>
          </Link>
        </div>

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
                    <Link href="/course">Home</Link>
                  </li>
                  <hr />
                  {/* <li className="hover:bg-blue-700">
                    <Link href="/webstore/order">Oder</Link>
                  </li> */}
                  <li className="hover:bg-blue-700">
                    <Link
                      href="webstore"
                      className="text-white flex items-center">
                      <FaShoppingCart className="text-lg mr-2" />
                      <h2 className="text-lg mb-0">Webstore</h2>
                    </Link>
                  </li>
                  <hr />
                  <li className="hover:bg-blue-700">
                    <Link href="/newsflash">Newsflash</Link>
                  </li>
                  <hr />
                  <li className="hover:bg-blue-700">
                    <a>Watch</a>
                    {/* <div className="user-profile">
                      <img src="feedback.png" />
                      <div>
                        <p>Give Feedback</p>
                        <a href="#">Help us to improve our platform</a>
                      </div>
                    </div> */}
                  </li>
                  <hr />
                  <li className="hover:bg-blue-700">
                    <Link href="#">Events</Link>
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
                  <li className="hover:bg-blue-700">
                    <Link href="/dashboard">Your Dashboard</Link>
                  </li>
                  <hr />
                  <li className="hover:bg-blue-700">
                    <a>See your Profile</a>
                    {/* <div className="user-profile">
                      <img src="feedback.png" />
                      <div>
                        <p>Give Feedback</p>
                        <a href="#">Help us to improve our platform</a>
                      </div>
                    </div> */}
                  </li>
                  <hr />
                  <li className="hover:bg-blue-700">
                    <Link href="/settings&privacy">Settings & Privacy</Link>
                  </li>
                  <hr />
                  <li className="hover:bg-blue-700">
                    <Link href="/feedback">Give Feedback</Link>
                  </li>
                  <hr />
                  {!user && (
                    <>
                      <li className="hover:bg-blue-700">
                        <Link href="/auth/Signin">Sign in</Link>
                      </li>
                      <hr />
                      <li className="hover:bg-blue-700">
                        <Link href="/auth/Signup">Sign up</Link>
                      </li>
                    </>
                  )}
                  {user && (
                    <>
                      <hr />
                      <li
                        onClick={handleLogout}
                        className="hover:bg-blue-700 px-4 py-2">
                        Log out
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
