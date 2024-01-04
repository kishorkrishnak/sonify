import { AiFillHome } from "react-icons/ai";
import { BiSolidPlaylist } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa6";
import { PiMusicNotesPlus } from "react-icons/pi";
import { TbMusicHeart } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Logo } from "../../assets/images";

import { FaChartBar } from "react-icons/fa";
import { useAppContext } from "../../App";
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
      text: "Favorite Artists",
      icon: <FaUserNinja color={iconColor} size={23} />,
    },
    {
      path: "/songs",
      text: "Favorite Songs",
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
    <nav className="ml-[6px] flex flex-col rounded-lg hidden sticky top-0 dark:text-[#a7a7a7] text-black bg-black h-[100vh] w-[290px]  h-[100vh] sm:flex">
      <nav className="gap-28 px-7 py-6 dark:bg-[#151515] bg-[#F3F3F5] rounded-md">
        <ul className="flex flex-col gap-5">
          <li>
            <a href="/ ">
              <div className="cursor-pointer flex justify-start items-center gap-2">
                <img className="h-[34px] w-[34px]" src={Logo} alt="logo" />
                <p className="text-lg">Melomuse</p>
              </div>
            </a>
          </li>
          {topLinks.map((link) => (
            <li
              key={uuidv4()}
              className="flex justify-start items-center gap-5"
            >
              {link.icon}
              <a
                className={`text-md ${
                  pathname === link.path ? "text-white" : ""
                }`}
                href={link.path}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="gap-28  px-7 py-6 dark:bg-[#151515] bg-[#F3F3F5] rounded-md h-[100%] mt-[6px]">
        <ul className="flex flex-col gap-5">
          {bottomLinks.map((link) => (
            <li
              key={uuidv4()}
              className="flex justify-start items-center gap-5"
            >
              {link?.icon}
              <a
                className={`text-md ${
                  pathname === link.path ? "text-white" : ""
                }`}
                href={link.path}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </nav>
  );
};

export default Sidebar;
