import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";

import { AiFillHome } from "react-icons/ai";
import { BiSolidPlaylist } from "react-icons/bi";
import { FaUserNinja, FaChartBar } from "react-icons/fa";
import { PiMusicNotesPlus } from "react-icons/pi";
import { TbMusicHeart } from "react-icons/tb";

const SidebarLink = ({ link, pathname, colorTheme }) => {
  return (
    <li key={uuidv4()} className="flex justify-start items-center gap-5">
      {link.icon}
      <Link
        className={`text-sm font-bold ${
          pathname === link.path && colorTheme !== "light" ? "text-white" : ""
        }`}
        to={link.path}
      >
        {link.text}
      </Link>
    </li>
  );
};
const Sidebar = () => {
  const { colorTheme } = useAppContext();
  const iconColor = colorTheme === "dark" ? "#a7a7a7" : "black";
  const { pathname } = useLocation();

  const topLinks = [
    {
      path: "/",
      text: "Home",
      icon: <AiFillHome color={iconColor} size={23} />,
    },
    {
      path: "/discover",
      text: "Discover",
      icon: <PiMusicNotesPlus color={iconColor} size={23} />,
    },
    {
      path: "/artists",
      text: "Liked Artists",
      icon: <FaUserNinja color={iconColor} size={23} />,
    },
    {
      path: "/songs",
      text: "Liked Songs",
      icon: <TbMusicHeart color={iconColor} size={23} />,
    },
  ];

  const bottomLinks = [
    {
      path: "/stats",
      text: "Spotify Stats",
      icon: <FaChartBar color={iconColor} size={23} />,
    },
    {
      path: "/playlistbuilder",
      text: "Playlist Builder",
      icon: <BiSolidPlaylist color={iconColor} size={23} />,
    },
  ];

  return (
    <nav className="hidden lg:flex flex-col h-[100vh] w-[290px] sticky top-0 bg-black text-black dark:text-[#a7a7a7] rounded-lg ml-[6px]">
      <nav className="rounded-md bg-[#F3F3F5] dark:bg-[#151515] px-7 py-6 gap-28">
        <ul className="flex flex-col gap-5">
          {topLinks.map((link) => (
            <SidebarLink
              key={uuidv4()}
              link={link}
              pathname={pathname}
              colorTheme={colorTheme}
            />
          ))}
        </ul>
      </nav>

      <nav className="rounded-md bg-[#F3F3F5] dark:bg-[#151515] px-7 py-6 gap-28 h-[100%] mt-[6px]">
        <ul className="flex flex-col gap-5">
          {bottomLinks.map((link) => (
            <SidebarLink
              key={uuidv4()}
              link={link}
              pathname={pathname}
              colorTheme={colorTheme}
            />
          ))}
        </ul>
      </nav>
    </nav>
  );
};

export default Sidebar;
