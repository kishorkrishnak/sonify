import { useState } from "react";
import { useAppContext } from "../../App";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import Searchbar from "../Searchbar/Searchbar";
import ModeSwitch from "../others/ModeSwitch";
import { LoginButton, LogoutButton } from "../sections";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#151515] rounded-md flex justify-between items-center px-3 sm:px-6 py-5 w-[100%]">
      <Searchbar />
      <div className="flex items-center justify-center gap-3">
        <ModeSwitch />
        {isLoggedIn ? (
          <>
            <ProfileIcon />
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;
