import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLink = ({ classNa, icon, url, context }) => {
  return (
    <li className="nav-item mb-0">
      <Link className={`nav-link ${classNa}`} to={`${url}`}>
        <FontAwesomeIcon className="fas fa-fw" icon={icon} />
        <span style={{ marginLeft: "5px" }} className="me-sm-0">
          {context}
        </span>
      </Link>
    </li>
  );
};

export default NavLink;
