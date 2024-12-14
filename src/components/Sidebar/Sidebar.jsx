import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options-container">
        <NavLink to={"/products"} className="sidebar-option">
          <p> Products Items</p>
        </NavLink>
        <NavLink to={"/category"} className="sidebar-option">
          <p> Category Items</p>
        </NavLink>

        {/* <NavLink to={"/orders"} className="sidebar-option">
          <p> Orders</p>
        </NavLink> */}
        {/* <NavLink to={"/user"} className="sidebar-option">
          <p> Users</p>
        </NavLink> */}
      </div>
    </div>
  );
};

export default sidebar;
