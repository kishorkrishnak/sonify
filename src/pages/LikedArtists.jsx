import React from "react";
import { PageLayout } from "../components/layout";
import { Loader } from "../components/misc";
import { Song } from "../components/cards";
import { v4 as uuidv4 } from "uuid";

const LikedArtists = () => {
  const favoriteSongs = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
  const renderFavoriteSongs = () => {
    if (!favoriteSongs) {
      return <Loader size={40} />;
    }

    return favoriteSongs.map((song, index) => (
      <div className="rounded-md px-3 bg-[#333333] w-full">
        <Song key={uuidv4()} song={song} />
      </div>
    ));
  };
  return (
    <PageLayout>
      <div className="carousel-container px-3 sm:px-6 pb-9 pt-2 flex flex-col justify-center">
        <p className="mb-5 text-2xl text-black dark:text-white font-bold ">
          Your Artists
        </p>

        <div className="flex flex-col justify-start items-center gap-2  h-full w-full">
          {renderFavoriteSongs()}
        </div>
      </div>
    </PageLayout>
  );
};

export default LikedArtists;
