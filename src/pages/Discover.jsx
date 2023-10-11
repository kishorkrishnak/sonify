import React from "react";
import { Bottombar, Header, Sidebar, UnderConstruction } from "../components";

const Discover = () => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex flex-col w-[100%] dark:bg-[#11162a] bg-white">
        <Header></Header>

        <UnderConstruction></UnderConstruction>
        <Bottombar></Bottombar>
      </div>
    </div>
  );
};

export default Discover;
