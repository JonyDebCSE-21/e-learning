import React from "react";
import Header from "../shared/Navbar/Header";
import LeftSideNavbar from "../shared/Navbar/LeftSideNavbar";
import RightSideNavbar from "../shared/Navbar/RightSideNavbar";
import Footer from "../shared/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <LeftSideNavbar />
        </div>
        <div className="col-span-8">{children}</div>
        <div className="col-span-2">
          <RightSideNavbar />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
