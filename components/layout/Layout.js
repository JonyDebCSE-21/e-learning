import React from "react";
import Header from "../shared/Navbar/Header";
import LeftSideNavbar from "../shared/Navbar/LeftSideNavbar";
import RightSideNavbar from "../shared/Navbar/RightSideNavbar";
import Footer from "../shared/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
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
    </div>
  );
};

export default Layout;
