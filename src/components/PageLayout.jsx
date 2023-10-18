import React from "react";
import Bottombar from "./Bottombar";
import Sidebar from "./Sidebar";
import Header from "./Header";

const PageLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex flex-col w-[100%] dark:bg-[#11162a] bg-white min-h-[100vh]">
        <Header></Header>

        {children}

        <Bottombar></Bottombar>
      </div>
    </div>
  );
};

export default PageLayout;
