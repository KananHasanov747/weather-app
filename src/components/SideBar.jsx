import React from "react";
import { FaCloudSunRain } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import logo from "../assets/logo.png";

function SideBarBtn({ Icon, text, url }) {
  const location = window.location.pathname;
  return (
    <button
      type="button"
      onClick={() => (window.location.pathname = url)}
      className={`flex flex-col items-center mt-8 text-light-white ${location === url ? "font-semibold" : "font-normal"}`}
    >
      <Icon className="text-xl mb-3" />
      <span className="text-sm">{text}</span>
    </button>
  );
}

export default function SideBar() {
  return (
    <div className="py-6 px-[15px] flex flex-col items-center rounded-3xl bg-light-gray">
      <img src={logo} alt="" className="w-11 mb-[1.25rem]" />
      <SideBarBtn Icon={FaCloudSunRain} text="Weather" url="/" />
      <SideBarBtn Icon={TfiMenuAlt} text="Cities" url="/cities" />
    </div>
  );
}
