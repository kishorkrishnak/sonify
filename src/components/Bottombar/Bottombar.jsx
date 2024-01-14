import { BiLibrary } from "react-icons/bi";
import { FaChartBar, FaHome, FaSearch } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import BottombarLink from "./BottombarLink";

const Bottombar = () => {
  const { colorTheme } = useAppContext();
  const iconColor = colorTheme === "dark" ? "white" : "black";
  const links = [
    {
      path: "/",
      text: "Home",

      icon: <FaHome color={iconColor} />,
    },
    {
      path: "/discover",
      text: "Discover",

      icon: <FaSearch color={iconColor} />,
    },

    {
      path: "/library",
      text: "Library",
      icon: <BiLibrary color={iconColor} size={23} />,
    },

    {
      path: "/stats",
      text: "Stats",

      icon: <FaChartBar color={iconColor} />,
    },
  ];
  return (
    <footer className="z-40 py-4 dark:bg-[#151515] bg-[#F3F3F5] fixed bottom-0 flex justify-around items-center px-3 w-[100%] text-black dark:text-white lg:hidden">
      {links.map((link) => (
        <BottombarLink link={link} key={uuidv4()} />
      ))}
    </footer>
  );
};

export default Bottombar;
