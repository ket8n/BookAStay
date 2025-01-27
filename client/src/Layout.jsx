import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="py-4 px-6">
      <Outlet />
    </div>
  );
};

export default Layout;
