import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../App";
import { PlaylistIcon } from "../../assets/images";
import { apiRequest } from "../../services";
import { v4 as uuidv4 } from "uuid";

const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);
  const { isLoggedIn } = useAppContext();
  const fetchUserPlaylists = async () => {
    try {
      const playlists = await apiRequest({
        url: "/me/playlists",
        authFlow: true,
      });
      setPlaylists(playlists?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchUserPlaylists();
    else setPlaylists(null);
  }, [isLoggedIn]);

  return (
    <div className="py-3 transition-all px-5 flex flex-col gap-4 overflow-y-hidden hover:overflow-y-auto">
      {playlists &&
        playlists.map((playlist) => (
          <Link
            key={uuidv4()}
            to={`/playlist/${playlist.id}`}
            className="flex items-center justify-start gap-3"
          >
            <img
              className="h-[45px] w-[45px] rounded-md"
              src={playlist?.images ? playlist?.images[0]?.url : PlaylistIcon}
              alt=""
            />

            <div className="flex flex-col items-start gap-1 justify-center">
              <p className="text-black dark:text-white text-sm">
                {playlist.name}
              </p>
              <p className="text-black dark:text-[#A6A6A6] text-xs">
                Playlist • {playlist?.owner?.display_name}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Playlists;
