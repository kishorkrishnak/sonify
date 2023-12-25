import { BiSolidPlaylist } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaUserCheck, FaUserNinja } from "react-icons/fa6";
import { IoIosRadio, IoMdAlbums } from "react-icons/io";
import { PiMusicNotesPlus } from "react-icons/pi";
import { TbMusicHeart } from "react-icons/tb";
import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const { pathname } = useLocation();
  const topLinks = [
    {
      path: "/",
      text: "Home",
      icon: <FaHome color="white" size={23} />,
    },
    {
      path: "/discover",
      text: "Discover",
      icon: <PiMusicNotesPlus color="white" size={23} />,
    },
    {
      path: "/radio",
      text: "Radio",
      icon: <IoIosRadio color="white" size={23} />,
    },

    {
      path: "/foryou",
      text: "For you",
      icon: <FaUserCheck color="white" size={23} />,
    },
  ];
  const bottomLinks = [
    {
      path: "/albums",
      text: "Albums",
      icon: <IoMdAlbums color="white" size={23} />,
    },
    {
      path: "/artists",
      text: "Artists",
      icon: <FaUserNinja color="white" size={23} />,
    },
    {
      path: "/songs",
      text: "Songs",
      icon: <TbMusicHeart color="white" size={23} />,
    },
    {
      path: "/playlists",
      text: "Playlists",
      icon: <BiSolidPlaylist color="white" size={23} />,
    },
  ];
  return (
    <nav className="hidden sticky top-0 dark:text-white text-black dark:bg-[#151515] bg-[#F3F3F5] h-[100vh] w-[235px] gap-28 px-11 py-16 flex flex-col justify-start h-[100vh] sm:flex">
      <ul className="flex flex-col gap-5">
        {topLinks.map((link, index) => (
          <li key={index} className="flex justify-start items-center gap-4">
            {link.icon}
            <a
              className={`text-md ${
                pathname === link.path ? "text-[#F0EF2A]" : ""
              }`}
              href={link.path}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col gap-5">
        {bottomLinks.map((link, index) => (
          <li key={index} className="flex justify-start items-center gap-4">
            {link?.icon}
            <a
              className={`text-md ${
                pathname === link.path ? "text-[#F0EF2A]" : ""
              }`}
              href={link.path}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
