import { useState } from "react";
import Searchbar from "../Searchbar";
import ModeSwitch from "../misc/ModeSwitch";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className=" bg-white dark:bg-[#151515] flex justify-between items-center px-3 sm:px-6 py-6 w-[100%]">
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Searchbar>
      <ModeSwitch />
    </header>
  );
};

export default Header;
