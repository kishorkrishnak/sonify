import React from "react";
import { Searchbar } from "./Searchbar";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-5 w-[100%] bg-red-400">
      <Searchbar></Searchbar>

      <dark-mode-toggle
    id="dark-mode-toggle-1"
    legend="Theme Switcher"
    appearance="switch"
    dark="Dark"
    light="Light"
    remember="Remember this"
  ></dark-mode-toggle>
    </header>
  );
};

export default Header;
