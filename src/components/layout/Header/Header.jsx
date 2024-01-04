import { useState } from "react";
import { useAppContext } from "../../../App";
import Login from "../../sections/LoginButton";
import Logout from "../../sections/LogoutButton";
import ModeSwitch from "../Header/ModeSwitch";
import Searchbar from "../Header/Searchbar";
import Profile from "../../sections/Profile/Profile";

const Header = () => {
  const { token } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#151515] rounded-md flex justify-between items-center px-3 sm:px-6 py-6 w-[100%]">
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Searchbar>
      <div className="flex items-center justify-center gap-3">
        <ModeSwitch />
        {!token ? (
          <Login />
        ) : (
          <>
            <Profile />
            <Logout />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
