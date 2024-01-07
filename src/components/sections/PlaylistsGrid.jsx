import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Playlist } from "../cards";

const PlaylistsGrid = ({ playlists }) => {
    console.log(playlists);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 h-[285px] overflow-hidden px-3 sm:px-6 justify-items-center">
      {playlists.map((playlist) => (
        <Playlist key={uuidv4()} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistsGrid;
