import React from "react";
import {FaSearch } from "react-icons/fa";
export const Searchbar = () => {
  return (
    <div class="rounded-lg container w-fit sm:w-[365px] bg-[#3C3E4D]  py-2 px-3">
      <div class="flex items-center justify-start">
        <button class="btn btn-default" type="submit">
          <FaSearch color="white" />
        </button>
        <input
          class="placeholder:text-sm placeholder:text-[grey] pl-2.5 outline-none bg-[#3C3E4D]"
          placeholder="Search Artist, Albums, Songs"
          name="srch-term"
          id="srch-term"
          type="text"
        />
      </div>
    </div>
  );
};
