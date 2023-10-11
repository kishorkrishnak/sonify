import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Bottombar from "../components/Bottombar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex flex-col w-[100%] bg-[#11162a] dark:bg-white">
        <Header></Header>
        <Bottombar></Bottombar>
      </div>
    </div>
  );
};

export default Home;
