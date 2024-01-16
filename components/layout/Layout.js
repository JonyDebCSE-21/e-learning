import React, { useEffect, useRef, useState } from "react";
import Header from "../shared/Navbar/Header";
import LeftSideNavbar from "../shared/Navbar/LeftSideNavbar";
import Footer from "../shared/Footer/Footer";
import { SiMessenger } from "react-icons/si";
import { FaRegWindowClose } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";

const Layout = ({ children }) => {
  const [isChatBoxShow, setIsChatBoxShow] = useState(false);
  const [chat, setChat] = useState(null);
  const [allChat, setAllChat] = useState([]);
  const [userChatBox, setUserChatBox] = useState(null);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.userReducer.user);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (isChatBoxShow) {
      const url =
        user.role == "user"
          ? `/api/user/adminChat?id=${user._id}`
          : `/api/user/adminChat`;
      const showMessage = () => {
        axios.get(url).then((res) => {
          if (user.role == "user") {
            console.log("first");
            setChat(res.data.chat);
          } else {
            setAllChat(res.data.chat);
          }
        });
      };
      showMessage();
      const intervalId = setInterval(showMessage, 2000);
      return () => clearInterval(intervalId);
    }
  }, [isChatBoxShow]);

  useEffect(() => {
    if (isChatBoxShow && userChatBox) {
      const showMessage = () => {
        axios
          .get(`/api/user/adminChat?chatId=${userChatBox._id}`)
          .then((res) => {
            if (user.role == "admin") {
              const updatedChat =
                res?.data?.chat?.conversation[
                  res.data.chat.conversation.length - 1
                ];

              const foundedChat = userChatBox.conversation.find(
                (chat) => chat._id == updatedChat._id
              );
              if (foundedChat) {
                return;
              } else {
                userChatBox.conversation.push(updatedChat);
                setUserChatBox(userChatBox);
              }
            }
          });
      };
      showMessage();
      const intervalId = setInterval(showMessage, 2000);
      return () => clearInterval(intervalId);
    }
  }, [isChatBoxShow, userChatBox]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [userChatBox?.conversation]);

  const sendMessage = (e) => {
    setMessage("");
    let data;

    if (chat && user.role == "user") {
      data = {
        _id: chat._id,
        userId: user._id,
        userName: user.name,
        message: message,
        userChat: true,
      };
    } else if (!chat && user.role == "user") {
      data = {
        userId: user._id,
        userName: user.name,
        message: message,
        userChat: true,
      };
    }
    if (userChatBox && user.role == "admin") {
      data = {
        _id: userChatBox._id,
        message: message,
        adminChat: true,
      };
    }

    axios.put(`/api/user/adminChat`, data).then((res) => {
      if (res.data) {
        setMessage("");
        setUserChatBox(userChatBox);
      }
    });
  };

  return (
    <div className="relative">
      <Header />
      <div className="grid grid-cols-12 gap-3 mb-2">
        <div className="col-span-3">
          <LeftSideNavbar />
        </div>
        <div className="col-span-9 my-1">{children}</div>
        {/* <div className="col-span-4">
          <RightSideNavbar />
        </div> */}
      </div>
      <Footer></Footer>
      <div className="fixed bottom-5 right-5">
        <div className="relative w-[500px]">
          <div className="absolute cursor-pointer -top-24 right-10">
            <SiMessenger
              onClick={() => {
                setIsChatBoxShow(true);
                // showMessage();
                // router.push("https://chat-apppp-2kxp.onrender.com/");
              }}
              className="text-7xl"
            />
          </div>
          {isChatBoxShow && (
            <div
              style={{
                boxShadow:
                  " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
              className=" absolute -top-[550px] right-16 flex flex-col justify-between bg-[#353241] w-full h-[500px] p-3 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-xl text-green-200 font-bold">Chat</span>
                <span
                  onClick={() => setIsChatBoxShow(false)}
                  className="text-xl text-white bg-black px-2 py-1 cursor-pointer">
                  <FaRegWindowClose className="text-green-200" />
                </span>
              </div>

              {user?.role == "user" && (
                <div className="border-2 h-[100%] m-3 scrollable-container  rounded-md">
                  {chat?.conversation?.length > 0 &&
                    chat?.conversation?.map((message) => (
                      <div className="p-2">
                        {message.sender ? (
                          <div className="text-[10px] text-gray-300">
                            {chat.sender.name}
                          </div>
                        ) : (
                          <p className="text-[10px] text-gray-300">Admin</p>
                        )}
                        <div className="bg-blue-200 px-3 py-1 rounded-lg mt-1">
                          {message.message}
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {user?.role == "admin" && (
                <div className="grid grid-cols-12 h-[350px]">
                  <div className="col-span-4 ">
                    {allChat.map((chat) => {
                      return (
                        <button
                          key={chat._id}
                          type="button"
                          onClick={() => setUserChatBox(chat)}
                          className={`text-white my-2 border p-2 rounded-lg w-full ${
                            userChatBox?._id == chat._id ? "bg-green-500" : ""
                          }`}>
                          {chat.sender.name}
                        </button>
                      );
                    })}
                  </div>
                  <div className="col-span-8">
                    {userChatBox && (
                      <div
                        ref={chatBoxRef}
                        key={userChatBox._id}
                        className="border-2 h-[350px] overflow-scroll w-full m-3 scrollable-container rounded-md">
                        {userChatBox?.conversation?.length > 0 &&
                          userChatBox?.conversation.map((message) => (
                            <div key={message?._id} className="p-2 ">
                              {message?.sender ? (
                                <div className="text-[10px] text-gray-300">
                                  {userChatBox?.sender?.name}
                                </div>
                              ) : (
                                <p className="text-[10px] text-gray-300">
                                  Admin
                                </p>
                              )}
                              <div className="bg-blue-200 px-3 py-1 rounded-lg mt-1">
                                {message?.message}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="w-[100%] flex justify-evenly items-center ">
                <input
                  style={{
                    boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                  }}
                  value={message}
                  className="w-[80%] mx-auto px-3 py-2 outline-none rounded-md bg-[#524c6b] text-white"
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent the default behavior (e.g., newline character in the input)
                      sendMessage();
                    }
                  }}
                />
                <IoSend
                  onClick={sendMessage}
                  className="text-xl text-blue-500 font-bold cursor-pointer"
                />
              </div>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Layout;
