import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IconDashboard from "../assets/icons/IconDashboard";
import IconUsers from "../assets/icons/IconUsers";
import IconProperties from "../assets/icons/IconProperties";
import IconBookings from "../assets/icons/IconBookings";

const Navbar = () => {
  const { pathname } = useLocation();

  let subpage = pathname.split("/")?.[1];
  if (subpage === undefined) {
    subpage = "";
  }

  const linkClasses = (type = null) => {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-gray-800 text-white";
    } else {
      classes += " bg-gray-200 text-gray-700";
    }
    return classes;
  };

  return (
    <nav className="py-4 flex justify-center gap-4">
      <Link className={linkClasses("")} to={"/"}>
        <IconDashboard />
        Dashboard
      </Link>
      <Link className={linkClasses("users")} to={"/users"}>
        <IconUsers />
        Users
      </Link>
      <Link className={linkClasses("properties")} to={"/properties"}>
        <IconProperties />
        Properties
      </Link>
      <Link className={linkClasses("bookings")} to={"/bookings"}>
        <IconBookings />
        Bookings
      </Link>
    </nav>
  );
};

export default Navbar;
