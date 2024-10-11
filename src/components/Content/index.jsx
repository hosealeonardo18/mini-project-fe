import React from "react";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";

const Content = ({ children }) => {
  return (
    <body className="sidebar-toggled">
      <div id="wrapper">
        <Sidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </body>
  );
};

export default Content;
