import { FaSearch } from "react-icons/fa";
import SearchSuggestions from "./SearchSuggestions";

const Searchbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col relative">
      <div className="rounded-lg container w-fit sm:w-[365px] dark:bg-[#3C3E4D] bg-[#F6F6F6]  py-2 px-3">
        <div className="flex items-center justify-start">
          <FaSearch color="white" />
          <input
            className="text-black dark:text-white placeholder:text-sm placeholder:text-[grey] pl-2.5 outline-none  dark:bg-[#3C3E4D] bg-[#F6F6F6]"
            placeholder="Search Artist, Albums, Songs"
            type="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
          />
        </div>
      </div>

      <SearchSuggestions searchQuery={searchQuery}></SearchSuggestions>
    </div>
  );
};

export default Searchbar;
