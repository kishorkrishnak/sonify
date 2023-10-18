import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="rounded-lg container w-fit sm:w-[365px] dark:bg-[#3C3E4D] bg-[#F6F6F6]  py-2 px-3">
      <div className="flex items-center justify-start">
        <FaSearch color="white" />
        <input
          className="placeholder:text-sm placeholder:text-[grey] pl-2.5 outline-none  dark:bg-[#3C3E4D] bg-[#F6F6F6]"
          placeholder="Search Artist, Albums, Songs"
          name="srch-term"
          id="srch-term"
          type="text"
        />
      </div>
    </div>
  );
};

export default Searchbar;
