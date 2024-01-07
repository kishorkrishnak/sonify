import { v4 as uuidv4 } from "uuid";
import { Playlist } from "../cards";

const PlaylistsGrid = ({ playlists, height }) => {
  let classNames =
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-hidden justify-items-center min-h-[250px]";
  if (height) classNames += " h-[285px]";

  return (
    <div className={classNames}>
      {playlists.map((playlist) => (
        <Playlist key={uuidv4()} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistsGrid;
