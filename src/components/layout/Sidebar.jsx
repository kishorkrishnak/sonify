import { AiFillHome } from "react-icons/ai";
import { BiSolidPlaylist } from "react-icons/bi";
import { FaUserCheck, FaUserNinja } from "react-icons/fa6";
import { IoIosRadio, IoMdAlbums } from "react-icons/io";
import { PiMusicNotesPlus } from "react-icons/pi";
import { TbMusicHeart } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { Logo } from "../../assets/images";
import { FaChartBar } from "react-icons/fa";
const Sidebar = () => {
  const { pathname } = useLocation();
  const topLinks = [
    {
      path: "/",
      text: "Home",
      icon: <AiFillHome color="white" size={23} />,
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
    // {
    //   path: "/albums",
    //   text: "Albums",
    //   icon: <IoMdAlbums color="white" size={23} />,
    // },
    {
      path: "/stats",
      text: "Spotify Stats",
      icon: <FaChartBar color="white" size={23} />,
    },
    {
      path: "/playlistbuilder",
      text: "Playlist Builder",
      icon: <BiSolidPlaylist color="white" size={23} />,
    },
    {
      path: "/artists",
      text: "Favorite Artists",
      icon: <FaUserNinja color="white" size={23} />,
    },
    {
      path: "/songs",
      text: "Favorite Songs",
      icon: <TbMusicHeart color="white" size={23} />,
    },
  ];
  return (
    <nav className="flex flex-col rounded-lg mt-[6px] hidden sticky top-0 dark:text-white text-black bg-black h-[100vh] w-[290px]  h-[100vh] sm:flex">
      <nav className="gap-28 px-11 py-16 dark:bg-[#151515] bg-[#F3F3F5]">
        <ul className="flex flex-col gap-5 ">
          <li>
            <a href="/ ">
              <div className="cursor-pointer flex justify-start items-center gap-2">
                <img className="h-[34px] w-[34px]" src={Logo} alt="" />
                <p className="text-lg">Melomuse</p>
              </div>
            </a>
          </li>
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
      </nav>

      <nav className="gap-28 px-11 py-16 dark:bg-[#151515] bg-[#F3F3F5] h-[100%] mt-[6px]">
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
    </nav>
  );
};

export default Sidebar;
