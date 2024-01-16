import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useAppContext } from "../../App";
import { useOutsideAlerter } from "../../hooks";
import SearchSuggestions from "./SearchSuggestions";

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearchbar = () => setSearchQuery("");

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, clearSearchbar);

  const { colorTheme } = useAppContext();
  const iconColor = colorTheme === "dark" ? "white" : "black";
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div ref={wrapperRef} className="flex flex-col relative">
      <div className="rounded-lg container w-[95%] sm:w-[365px] dark:bg-[#2A2A2A] bg-[#F6F6F6] py-2 px-3">
        <div className="flex items-center justify-between">
          <div className="z-30 flex items-center justify-center">
            <FaSearch color={iconColor} />
            <input
              className="text-black dark:text-white placeholder:text-sm placeholder:text-black dark:placeholder:text-[grey] pl-2.5 outline-none dark:bg-[#2A2A2A] bg-[#F6F6F6] w-[100%]"
              placeholder="Search Artist, Albums, Songs"
              type="text"
              id="searchbar"
              onChange={handleInputChange}
              value={searchQuery}
            />
          </div>
          {searchQuery && searchQuery.length > 0 && (
            <IoCloseSharp size={18} color="white" onClick={clearSearchbar} />
          )}
        </div>
      </div>

      {searchQuery && <SearchSuggestions searchQuery={searchQuery} />}
    </div>
  );
};

export default Searchbar;
