import { BiLibrary } from "react-icons/bi";
import { FaChartBar, FaHome, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";

const Bottombar = () => {
  const { pathname } = useLocation();
  const { colorTheme } = useAppContext();
  const iconColor = colorTheme === "dark" ? "#a7a7a7" : "black";
  const links = [
    {
      path: "/",
      text: "Home",

      icon: <FaHome color="white" />,
    },
    {
      path: "/discover",
      text: "Discover",

      icon: <FaSearch color="white" />,
    },

    {
      path: "/library",
      text: "Library",
      icon: <BiLibrary color={iconColor} size={23} />,
    },

    {
      path: "/stats",
      text: "Stats",

      icon: <FaChartBar color="white" />,
    },
  ];
  return (
    <footer className="z-40 py-4 dark:bg-[#151515] bg-[#F3F3F5] fixed bottom-0 flex justify-around items-center px-3 w-[100%] text-white lg:hidden">
      {links.map((link) => (
        <Link
          key={uuidv4()}
          to={link.path}
          className={`cursor-pointer flex flex-col justify-center items-center gap-0.5 ${
            pathname === link.path ? "text-[#F0EF2A]" : ""
          }`}
        >
          {link.icon}
          {link.text}
        </Link>
      ))}
    </footer>
  );
};

export default Bottombar;
