import { useState } from "react";
import ModeSwitch from "../Header/ModeSwitch";
import Searchbar from "../Header/Searchbar";
import Login from "../../sections/Login";
import { useAppContext } from "../../../App";
const Header = () => {
  const { token } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className="bg-white dark:bg-[#151515] flex justify-between items-center px-3 sm:px-6 py-6 w-[100%]">
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Searchbar>
      {!token && <Login />}
      <ModeSwitch />
    </header>
  );
};

export default Header;
