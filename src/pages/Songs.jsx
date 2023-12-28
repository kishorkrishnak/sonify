import React from "react";
import { PageLayout } from "../components/layout";
import { Loader } from "../components/misc";
import { Song } from "../components/cards";

const Songs = () => {
  const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs'))|| [];
  console.log(favoriteSongs);
  const renderFavoriteSongs = () => {
    if (!favoriteSongs) {
      return <Loader size={40} />;
    }

    return favoriteSongs
      .map((song, index) => (
        <div className="rounded-md px-3 bg-[#333333] w-full"><Song key={index} song={song} /></div>
      ));
  };

  return (
    <PageLayout>
      <div className="carousel-container px-3 pb-9 pt-2 flex flex-col justify-center">
        <p className="mb-5 text-3xl text-black dark:text-white font-bold ">
          Your Songs
        </p>

        <div className="flex flex-col justify-start items-center gap-2  h-full w-full">
          {renderFavoriteSongs()}
        </div>
      </div>
    </PageLayout>
  );
};

export default Songs;
