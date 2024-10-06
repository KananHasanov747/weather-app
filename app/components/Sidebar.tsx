import { FaCloudSunRain, FaUser } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import logo from "../assets/logo.png";
import { ClientOnly } from "remix-utils/client-only";
import { useNavigate } from "@remix-run/react";

function SideBarBtn({ Icon, text, url }) {
  const navigate = useNavigate();
  return (
    <ClientOnly fallback={null}>
      {() => (
        <button
          type="button"
          onClick={() => navigate(url)}
          className={`flex flex-col items-center mt-8 text-light-white ${
            window.location.pathname === url ? "font-semibold" : "font-normal"
          }`}
        >
          <Icon className="text-xl mb-3" />
          <span className="text-sm">{text}</span>
        </button>
      )}
    </ClientOnly>
  );
}

export default function SideBar() {
  return (
    <div className="py-6 px-[15px] flex flex-col items-center rounded-3xl bg-light-gray">
      <img src={logo} alt="" className="w-11 mb-[1.25rem]" />
      <SideBarBtn Icon={FaCloudSunRain} text="Weather" url="/" />
      <SideBarBtn Icon={TfiMenuAlt} text="Cities" url="/cities" />
      <SideBarBtn Icon={FaUser} text="Auth" url="/auth" />
    </div>
  );
}
