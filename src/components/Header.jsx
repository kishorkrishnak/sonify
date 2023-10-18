import ModeSwitch from "./ModeSwitch";
import Searchbar from "./Searchbar";
const Header = () => {
  return (
    <header className=" bg-white dark:bg-[#11162a] flex justify-between items-center px-3 sm:px-6 py-6 w-[100%]">
      <Searchbar></Searchbar>
      <ModeSwitch />
    </header>
  );
};

export default Header;
