import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="py-4 px-6">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
