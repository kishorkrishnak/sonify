import { AiFillHome } from "react-icons/ai";
import { BiLibrary, BiSolidPlaylist } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";
import { PiMusicNotesPlus } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import { Logo } from "../../assets/images";
import SidebarBottomLink from "./SidebarBottomLink";
import SidebarLink from "./SidebarTopLink";
import Playlists from "./Playlists";

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
    <nav className="hidden lg:flex flex-col h-[100vh] w-[320px] sticky top-0 bg-black text-black dark:text-[#a7a7a7]">
      <nav className="bg-[#F3F3F5] dark:bg-[#151515] px-5 py-5 gap-28">
        <ul className="flex flex-col gap-5">
          <li>
            <Link to="/">
              <div className="cursor-pointer flex justify-start items-center gap-2">
                <img className="h-[32px] w-[32px]" src={Logo} alt="" />
                <p className="text-lg font-bold text-black dark:text-white">
                  Sonify
                </p>
              </div>
            </Link>
          </li>
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

      <nav className="overflow-y-auto bg-[#F3F3F5] dark:bg-[#151515] px-5 py-5 gap-28 h-[100%] mt-[2px]">
        <Link to={"/library"}>
          <div className="mb-4 w-fit flex gap-3 items-center justify-center">
            <BiLibrary color={iconColor} size={23} />
            <h1 className="font-bold">Your Library</h1>
          </div>
        </Link>
        <ul className="flex gap-2 flex-wrap">
          {bottomLinks.map((link) => (
            <SidebarBottomLink key={uuidv4()} link={link} pathname={pathname} />
          ))}
        </ul>
      
        <Playlists />
      </nav>
    </nav>
  );
};

export default Sidebar;
