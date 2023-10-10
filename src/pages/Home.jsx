import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex flex-col">
        <Header></Header>
      </div>
    </div>
  );
};

export default Home;
