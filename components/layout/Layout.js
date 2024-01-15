import React, { useState } from "react";
import Header from "../shared/Navbar/Header";
import LeftSideNavbar from "../shared/Navbar/LeftSideNavbar";
import RightSideNavbar from "../shared/Navbar/RightSideNavbar";
import Footer from "../shared/Footer/Footer";
import { SiMessenger } from "react-icons/si";
import { FaRegWindowClose } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";

const Layout = ({ children }) => {
  const [isChatBoxShow, setIsChatBoxShow] = useState(false);
  const [wsConnection, setWsConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [names, setNames] = useState([]);
  const [texts, setTexts] = useState([]);
  // const [messages, setMessages] = useState([]);
  const router = useRouter();
  const user = useSelector((state) => state.userReducer.user);

  // console.log("user from footer", user);

  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:5001");
  //   setWsConnection(ws);
  //   ws.addEventListener("message", handleMessage);
  // }, []);

  // const handleMessage = (e) => {
  //   console.log("message", e.data);
  // };

  const showMessage = () => {
    axios.get("/api/user/chat").then((res) => {
      // console.log("dekhi", res.data.chats[0]);
      // setMessages(res.data.chats);
      if (res.data) {
        setNames(res.data?.chats[0]?.name);
        setTexts(res.data?.chats[0]?.text);
      }
    });

    setTimeout(() => {
      showMessage();
    }, 1000);
  };

  // console.log(isChatBoxShow);
  const pairs = [];
  if (names && texts) {
    for (let i = 0; i < Math.min(names?.length, texts?.length); i++) {
      pairs.push({ name: names[i], text: texts[i] });
    }
  }

  const messages = pairs.reverse();

  // console.log("pairs", messages);

  const sendMessage = (e) => {
    // console.log(message);
    setMessage("");
    const data = {
      text: message,
      name: user.name,
    };
    // console.log(data);

    axios.post("/api/user/chat", data).then((res) => {
      if (res.data) {
        setMessage("");
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
      <div className="sticky bottom-5 right-5">
        <div className="absolute cursor-pointer -top-24 right-10">
          <SiMessenger
            onClick={() => {
              setIsChatBoxShow(true);
              showMessage();
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
            className=" absolute -top-[550px] right-16 flex flex-col justify-between bg-[#353241] w-[30%] h-[500px] p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-xl text-green-200 font-bold">Chat</span>
              <span
                onClick={() => setIsChatBoxShow(false)}
                className="text-xl text-white bg-black px-2 py-1 cursor-pointer">
                <FaRegWindowClose className="text-green-200" />
              </span>
            </div>

            <div className="border-2 h-[100%] m-3 scrollable-container  rounded-md">
              {messages.length > 0 &&
                messages.map((message) => (
                  <div className="p-2">
                    <div className="text-[10px] text-gray-300">
                      {message.name}
                    </div>
                    <div className="bg-blue-200 px-3 py-1 rounded-lg mt-1">
                      {message.text}
                    </div>
                  </div>
                ))}
            </div>
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
        )}
      </div>
    </div>
  );
};

export default Layout;
