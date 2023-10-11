import React from "react";

const Sidebar = () => {
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
    <nav className="hidden bg-r text-white dark:text-black bg-[#2C3856] dark:bg-[#F3F3F5] h-[100vh] w-[235px] gap-28 px-11 py-16 flex flex-col justify-start h-[100vh] sm:flex">
      <ul className="flex flex-col gap-5">
        {topLinks.map((link) => (
          <li>
            <a className="text-md" href={link.path}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col gap-5">
        {bottomLinks.map((link) => (
          <li>
            <a className="text-md" href={link.path}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
