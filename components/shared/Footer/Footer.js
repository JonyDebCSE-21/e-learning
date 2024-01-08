import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SiMessenger } from "react-icons/si";
import { IoSend } from "react-icons/io5";
import { FaRegWindowClose } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";

const Footer = () => {
  const [isChatBoxShow, setIsChatBoxShow] = useState(false);
  const [wsConnection, setWsConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [names, setNames] = useState([]);
  const [texts, setTexts] = useState([]);
  // const [messages, setMessages] = useState([]);
  const router = useRouter();
  const user = useSelector((state) => state.userReducer.user);

  console.log("user from footer", user);

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

  const pairs = [];
  if (names && texts) {
    for (let i = 0; i < Math.min(names?.length, texts?.length); i++) {
      pairs.push({ name: names[i], text: texts[i] });
    }
  }

  const messages = pairs.reverse();

  console.log("pairs", messages);

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
    <div className="bg-blue-700 relative">
      <footer className="container mx-auto footer footer-center p-5 text-base-content rounded flex flex-col pt-5 md:flex-row">
        <div className="text-center">
          <a href="/" className="mb-4 flex items-center justify-left">
            <p className="font-bold text-black hover:text-green transition-all duration-300 ease-in-out whitespace-nowrap">
              Copyright 2024 - All rights reserved by
              <img
                src="/images/EQ-logo.png"
                alt="Logo"
                className="h-10 w-full ml-2"
              />
              A hassle-free learning boundary
            </p>
          </a>
        </div>

        <div className="mx-0 flex w-full justify-center border-b border-[#E4E4E4] pb-8 md:mx-14 md:border-none mx-lg:mx-0 mx-lg:border-b mx-lg:border-[#E4E4E4]">
          <div className="flex w-full max-w-sm justify-center space-x-6">
            <div className="bg-white w-1/2 p-4 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
              <h3 className="mb-3 text-lg font-semibold text-blue-500 hover:text-green-500 transition-all duration-300 ease-in-out">
                Our services
              </h3>
              <ul className="mb-4 space-y-2">
                <li>
                  <Link
                    href="/footerPage/career"
                    className="text-sm font-medium hover:text-green transition-all duration-300 ease-in-out">
                    Career
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-green transition-all duration-300 ease-in-out">
                    Join as a Teacher
                  </a>
                </li>
                <li>
                  <Link
                    href="/footerPage/investor"
                    className="text-sm font-medium hover:text-green transition-all duration-300 ease-in-out">
                    Become an Investor
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white w-1/2 p-4 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
              <h3 className="mb-3 text-lg font-semibold text-blue-500 hover:text-green-500 transition-all duration-300 ease-in-out">
                Others
              </h3>
              <ul className="mb-4 space-y-2">
                <li>
                  <a
                    href="/footerPage/privacypolicy"
                    className="text-sm font-medium hover:text-green transition-all duration-300 ease-in-out">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/footerPage/terms&condition"
                    className="text-sm font-medium hover:text-green transition-all duration-300 ease-in-out">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/footerPage/refundpolicy"
                    className="text-sm font-medium hover:text-green transition-all duration-300 ease-in-out">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white w-3/4 p-3 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
          <div className="hidden md:block">
            <h3 className="mb-3 text-lg font-semibold text-blue-500 hover:text-green-500 transition-all duration-300 ease-in-out">
              Contact with us
            </h3>
            <p className="mb-2 text-base font-normal">
              Mobile:{" "}
              <span>
                <a
                  className="text-green hover:underline"
                  href="tel:+8801740925374">
                  +8801740925374
                </a>
              </span>
            </p>
            <p className="mb-2 text-base font-normal">
              Email:{" "}
              <span className="text-green">onlineworkhour24@gmail.com</span>
            </p>
          </div>

          <div className="mx-auto mt-2 flex justify-center space-x-6">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="transition-all duration-300 ease-in-out transform hover:scale-110">
              <img
                alt="facebook"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                data-nimg="1"
                className="object-contain"
                src="/images/fb.png"
              />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="transition-all duration-300 ease-in-out transform hover:scale-110">
              <img
                alt="youtube"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                data-nimg="1"
                className="object-contain"
                src="/images/tube.png"
              />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="transition-all duration-300 ease-in-out transform hover:scale-110">
              <img
                alt="linkdin"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                data-nimg="1"
                className="object-contain"
                src="/images/in.png"
              />
            </a>
          </div>
        </div>
      </footer>
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
          className=" absolute -top-96 right-20 flex flex-col justify-between bg-[#353241] w-[30%] h-[500px] p-3 rounded-md">
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
  );
};

export default Footer;
