import React from "react";
import { Artist } from "../cards";
import { v4 as uuidv4 } from "uuid";

const ArtistsGrid = ({ artists }) => {
  return (
    <div className="w-[100%] grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-y-10">
      {artists?.map((artist) => {
        return <Artist artist={artist} key={uuidv4()} />;
      })}
    </div>
  );
};

export default ArtistsGrid;
