import React from "react";
import NavLink from "../NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmileWink,
  faGaugeHigh,
  faScaleBalanced,
  faCube,
  faPeopleCarryBox,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <FontAwesomeIcon icon={faFaceSmileWink} />
        </div>
        <div className="sidebar-brand-text mx-3">Mini Project</div>
      </a>

      <hr className="sidebar-divider my-0" />
      <NavLink icon={faGaugeHigh} url="/" context="Dashboard" />

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Master Data</div>

      <NavLink icon={faScaleBalanced} url="/penjualan" context="Penjualan" />
      <NavLink icon={faCube} url="/barang" context="Barang" />
      <NavLink icon={faPeopleCarryBox} url="/pelanggan" context="Pelanggan" />

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="d-flex justify-content-center">
        <button
          className="rounded-circle border-0 d-flex justify-content-center align-items-center"
          id="sidebarToggle"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
    </ul>
  );
};

export default Sidebar;
