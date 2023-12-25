import { FaSearch } from "react-icons/fa";
import SearchSuggestions from "./SearchSuggestions";
import { IoCloseSharp } from "react-icons/io5";
const Searchbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col relative">
      <div className="rounded-lg container w-fit sm:w-[365px] dark:bg-[#2A2A2A] bg-[#F6F6F6]  py-2 px-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <FaSearch color="white" />
            <input
              className="text-black dark:text-white placeholder:text-sm placeholder:text-[grey] pl-2.5 outline-none  dark:bg-[#2A2A2A] bg-[#F6F6F6]"
              placeholder="Search Artist, Albums, Songs"
              type="text"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery}
            />
          </div>
          {searchQuery && searchQuery.length > 0 && (
            <IoCloseSharp
              size={18}
              color="white"
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
      </div>

      <SearchSuggestions searchQuery={searchQuery}></SearchSuggestions>
    </div>
  );
};

export default Searchbar;
