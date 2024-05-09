import React from "react";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <div className="flex flex-row h-screen">
        {/* Sidebar */}
        <div className="basis-1/6">
          <Navbar />
        </div>
        {/* Content */}
        <div className="basis-5/6">
        <Outlet/>
        </div>
      </div>
    </>
  );
};

export default Admin;
