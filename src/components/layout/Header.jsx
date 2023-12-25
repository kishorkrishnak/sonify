import { useState } from "react";
import ModeSwitch from "../misc/ModeSwitch";
import Searchbar from "../Searchbar";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className=" bg-white dark:bg-[#11162a] flex justify-between items-center px-3 sm:px-6 py-6 w-[100%]">
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Searchbar>
      <ModeSwitch />
    </header>
  );
};

export default Header;
