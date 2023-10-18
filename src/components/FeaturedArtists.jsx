import React from "react";
import Artist from "./Artist";

const FeaturedArtists = () => {
  return (
    <div className="flex flex-col items-start px-2 sm:px-6 mt-5 gap-5">
      <p className="text-3xl text-white font-bold">Featured Artists</p>

      <div className="flex w-[100%] flex-wrap gap-5 ">
        <Artist></Artist>
        <Artist></Artist>
        <Artist></Artist>
        <Artist></Artist>
        <Artist></Artist>
        <Artist></Artist>
        <Artist></Artist>
        <Artist></Artist>
      </div>
    </div>
  );
};

export default FeaturedArtists;
