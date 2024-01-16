import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services";
import { useAppContext } from "../../App";
import { Playlist } from "../cards";
import { PlaylistIcon } from "../../assets/images";
import { Link } from "react-router-dom";

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
      console.log(playlists?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchUserPlaylists();
    else setPlaylists(null);
  }, [isLoggedIn]);
  return (
    <div className="mt-5 flex flex-col gap-3 hover:overflow-y-auto">
      {playlists &&
        playlists.map((playlist) => (
          <Link
            to={`/playlist/${playlist.id}`}
            className="flex items-center justify-start gap-3"
          >
            <img
              className="h-[40px] w-[40px] rounded-md"
              src={playlist?.images[0]?.url || PlaylistIcon}
              alt=""
            />

            <div className="flex flex-col items-start gap-1 justify-center">
              <p className="text-black dark:text-white text-sm">
                {playlist.name}
              </p>
              <p className="text-black dark:text-white text-xs">
                Playlist • {playlist?.owner?.display_name}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Playlists;
