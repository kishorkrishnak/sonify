import { AiFillHome } from "react-icons/ai";
import { BiSolidPlaylist } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";
import { PiMusicNotesPlus } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import { Logo } from "../../assets/images";
import Playlists from "./Playlists";
import SidebarBottomLink from "./SidebarBottomLink";
import SidebarLink from "./SidebarTopLink";

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

  const bottomLinks = [
    {
      path: "/library/artists",
      text: "Artists",
      loginRequired: true,
    },
    {
      path: "/library/playlists",
      text: "Playlists",
      loginRequired: true,
    },
    {
      path: "/library/albums",
      text: "Albums",
      loginRequired: true,
    },
    {
      path: "/library/songs",
      text: "Songs",
      loginRequired: true,
    },
  ];

  return (
    <nav className=" bg-[#F3F3F5] dark:bg-[#151515] hidden lg:flex flex-col h-[100vh] w-[330px] sticky top-0 text-black dark:text-[#a7a7a7]">
      <ul className="py-5 flex flex-col gap-5 px-5 bg-[#F3F3F5] dark:bg-[#151515]">
        <li>
          <Link to="/">
            <div className="cursor-pointer flex justify-center items-center gap-2">
              <img className="h-[32px] w-[32px]" src={Logo} alt="" />
              <p className="text-lg font-bold text-black dark:text-white">
                Sonify
              </p>
            </div>
          </Link>
        </li>
        <Link to={"/library"}>
          <h1 className="font-bold">Menu</h1>
        </Link>
        {topLinks.map((link) => (
          <SidebarLink
            key={uuidv4()}
            link={link}
            pathname={pathname}
            colorTheme={colorTheme}
          />
        ))}
      </ul>

      <div className="mt-3 px-5 mb-2 w-fit flex gap-3 items-center justify-center">
        <h1 className="font-bold">Your Playlists</h1>
      </div>
      <Playlists />
    </nav>
  );
};

export default Sidebar;
