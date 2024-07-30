import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  let subpage = pathname.split("/")?.[1];
  if (subpage === undefined) {
    subpage = "";
  }

  const linkClasses = (type = null) => {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-red-500 text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  };

  return (
    <nav className="py-4 flex justify-center gap-4">
      <Link className={linkClasses("")} to={"/"}>
        dashboard
      </Link>
      <Link className={linkClasses("users")} to={"/users"}>
        users
      </Link>
      <Link className={linkClasses("properties")} to={"/properties"}>
        properties
      </Link>
      <Link className={linkClasses("bookings")} to={"/bookings"}>
        bookings
      </Link>
    </nav>
  );
};

export default Navbar;
