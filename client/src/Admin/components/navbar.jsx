import React, { useState } from "react";
import "../assets/css/navbar.css";
import { FaMapMarkedAlt, FaDoorClosed } from "react-icons/fa";
import { FaPersonWalkingLuggage, FaPersonBooth } from "react-icons/fa6";
import { IoIosBookmarks } from "react-icons/io";
import { MdDashboard, MdWorkHistory } from "react-icons/md";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [active, setactive] = useState("dashboard");
  return (
    <>
      <div className="w-1/6 h-screen fixed flex flex-col gap-5 bg-slate-100 text-gray-800 drop-shadow-2xl z-30   ">
        <div>
          <h1 className="font-bold text-xl text-center bg-blue-700 drop-shadow-lg  text-white p-5">
            Admin Panel
          </h1>
        </div>
        <div className="navlinks h-auto list-none overflow-y-auto mt-4  p-4 ">
          <ul className="flex flex-col gap-6 ">
            <Link to={"/admin"}>
              <li
                className={` w-100 p-3 rounded-md border-gray-400 border-b-2 flex ${
                  active === "dashboard" ? "bg-slate-200" : ""
                }  items-center trnasition-effect hover:bg-slate-200 hover:scale-105`}
                onClick={() => {
                  setactive("dashboard");
                }}
              >
                <span className="text-blue-700 mx-2">
                  <MdDashboard />
                </span>
                Dashboard
              </li>
            </Link>
            <Link to={"branches"}>
              <li
                className={` w-100 p-3 rounded-md border-gray-400 border-b-2 flex ${
                  active === "branches" ? "bg-slate-200" : ""
                }  items-center trnasition-effect hover:bg-slate-200 hover:scale-105`}
                onClick={() => {
                  setactive("branches");
                }}
              >
                <span className="text-blue-700 mx-2">
                  <FaMapMarkedAlt />
                </span>
                Branches
              </li>
            </Link>
            <Link to={"guest"}>
              <li
                className={` w-100 p-3 rounded-md border-gray-400 border-b-2 flex ${
                  active === "guest" ? "bg-slate-200" : ""
                }  items-center trnasition-effect hover:bg-slate-200 hover:scale-105`}
                onClick={() => {
                  setactive("guest");
                }}
              >
                <span className="text-blue-700 mx-2">
                  <FaPersonWalkingLuggage />
                </span>
                Guests
              </li>
            </Link>
            <Link to={"room"}>
              <li
                className={` w-100 p-3 rounded-md border-gray-400 border-b-2 flex ${
                  active === "room" ? "bg-slate-200" : ""
                }  items-center trnasition-effect hover:bg-slate-200 hover:scale-105`}
                onClick={() => {
                  setactive("room");
                }}
              >
                <span className="text-blue-700 mx-2">
                  <FaDoorClosed />
                </span>
                Rooms
              </li>
            </Link>
            <Link to={"staff"}>
              <li
                className={` w-100 p-3 rounded-md border-gray-400 border-b-2 flex ${
                  active === "staff" ? "bg-slate-200" : ""
                }  items-center trnasition-effect hover:bg-slate-200 hover:scale-105`}
                onClick={() => {
                  setactive("staff");
                }}
              >
                <span className="text-blue-700 mx-2">
                  <FaPersonBooth />
                </span>
                Staff
              </li>
            </Link>
            <Link to={"booking"}>
              <li
                className={` w-100 p-3 rounded-md border-gray-400 border-b-2 flex ${
                  active === "booking" ? "bg-slate-200" : ""
                }  items-center trnasition-effect hover:bg-slate-200 hover:scale-105`}
                onClick={() => {
                  setactive("booking");
                }}
              >
                <span className="text-blue-700 mx-2">
                  <IoIosBookmarks />
                </span>
                Bookings
              </li>
            </Link>
            <Link to={"duty"}>
              <li
                className={` w-100 p-3 rounded-md border-gray-400 border-b-2 flex ${
                  active === "duty" ? "bg-slate-200" : ""
                }  items-center trnasition-effect hover:bg-slate-200 hover:scale-105`}
                onClick={() => {
                  setactive("duty");
                }}
              >
                <span className="text-blue-700 mx-2">
                  <MdWorkHistory />
                </span>
                Duty
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
