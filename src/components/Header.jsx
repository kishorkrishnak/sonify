import React from "react";
import ModeSwitch from "./ModeSwitch";
import { Searchbar } from "./Searchbar";
const Header = () => {
  return (
    <header className="bg-[#11162a] dark:bg-white flex justify-between items-center px-6 py-8 w-[100%]">
      <Searchbar></Searchbar>
      <ModeSwitch />
    </header>
  );
};

export default Header;
