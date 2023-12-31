import { useState } from "react";
import { useAppContext } from "../../../App";
import Login from "../../sections/Login";
import Logout from "../../sections/Logout";
import ModeSwitch from "../Header/ModeSwitch";
import Searchbar from "../Header/Searchbar";

const Header = () => {
  const { token } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className="bg-white dark:bg-[#151515] flex justify-between items-center px-3 sm:px-6 py-6 w-[100%]">
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Searchbar>
      <div className="flex items-center justify-center gap-3">
        <ModeSwitch />
        {!token ? <Login /> : <Logout />}
      </div>
    </header>
  );
};

export default Header;
