import React, { useState } from "react";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  const topLinks = [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/discover",
      text: "Discover",
    },
    {
      path: "/radio",
      text: "Radio",
    },
    { path: "/foryou", text: "For you" },
  ];
  const bottomLinks = [
    {
      path: "/library",
      text: "Your Library",
    },
    {
      path: "/albums",
      text: "Albums",
    },
    {
      path: "/artists",
      text: "Artists",
    },
    { path: "/songs", text: "Songs" },
    {
      path: "/playlists",
      text: "Playlists",
    },
  ];
  return (
    <nav className="hidden sticky top-0 dark:text-white text-black dark:bg-[#2C3856] bg-[#F3F3F5] h-[100vh] w-[235px] gap-28 px-11 py-16 flex flex-col justify-start h-[100vh] sm:flex">
      <ul className="flex flex-col gap-5">
        {topLinks.map((link,index) => (
          <li key={index}>
            <a
              onClick={() => setActiveLink(link.text)}
              className={`text-md ${
                activeLink === link.text ? "text-[#F0EF2A]" : ""
              }`}
              href={link.path}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col gap-5">
        {bottomLinks.map((link,index) => (
          <li key={index}>

            <a
              onClick={() => setActiveLink(link.text)}
              className={`text-md ${
                activeLink === link.text ? "text-[#F0EF2A]" : ""
              }`}
              href={link.path}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
