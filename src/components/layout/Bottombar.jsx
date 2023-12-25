import { FaBroadcastTower, FaHeart, FaHome, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  const links = [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/discover",
      text: "Discover",
    },
    { path: "/favorites", text: "Favorites" },

    {
      path: "/radio",
      text: "Radio",
    },
  ];
  return (
    <footer className="py-4 dark:bg-[#151515] bg-[#F3F3F5] fixed bottom-0 flex justify-around items-center px-3 w-[100%] text-white sm:hidden">
      <div className="cursor-pointer flex flex-col justify-center items-center gap-0.5">
        <FaHome color="white" />
        Home
      </div>
      <div className="cursor-pointer flex flex-col justify-center items-center gap-0.5">
        <FaSearch color="white" />
        Discover
      </div>
      <div className="cursor-pointer flex flex-col justify-center items-center gap-0.5">
        <FaHeart color="white" />
        Favorites
      </div>
      <div className="cursor-pointer flex flex-col justify-center items-center gap-0.5">
        <FaBroadcastTower color="white" />
        Radio
      </div>
    </footer>
  );
};

export default Bottombar;
