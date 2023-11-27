import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#0284c7] ">
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
                    href="/footerPage/"
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
    </div>
  );
};

export default Footer;
