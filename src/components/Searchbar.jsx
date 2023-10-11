import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div class="rounded-lg container w-fit sm:w-[365px] dark:bg-[#3C3E4D] bg-[#F6F6F6]  py-2 px-3">
      <div class="flex items-center justify-start">
        <FaSearch color="white" />
        <input
          class="placeholder:text-sm placeholder:text-[grey] pl-2.5 outline-none  dark:bg-[#3C3E4D] bg-[#F6F6F6]"
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
