import { FaBroadcastTower, FaHeart, FaHome, FaSearch } from "react-icons/fa";

const Bottombar = () => {
  return (
    <footer className="py-4 bg-[#2C3856] fixed bottom-0 flex justify-around items-center px-3 w-[100%] text-white sm:hidden">
      <div className="flex flex-col justify-center items-center gap-0.5">
        <FaHome color="white" />
        Home
      </div>
      <div className="flex flex-col justify-center items-center gap-0.5">
        <FaSearch color="white" />
        Discover
      </div>
      <div className="flex flex-col justify-center items-center gap-0.5">
        <FaHeart color="white" />
        Favorites
      </div>
      <div className="flex flex-col justify-center items-center gap-0.5">
        <FaBroadcastTower color="white" />
        Radio
      </div>
    </footer>
  );
};

export default Bottombar;
