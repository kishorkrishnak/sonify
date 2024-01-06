import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useIsVisible from "../../hooks/useIsVisible";
import { apiRequest } from "../../utils/api";
import Playlist from "../cards/Playlist";

const PlaylistCarousel = ({ id, title }) => {
  const elemRef = useRef();
  const isVisible = useIsVisible(elemRef);

  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await apiRequest({
          url: `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
        });

        setPlaylists(response?.playlists?.items || []);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };

    if (isVisible) fetchPlaylists();
  }, [isVisible]);

  return (
    <div ref={elemRef} className="pb-4 flex flex-col justify-center">
      {isVisible && playlists && (
        <>
          <p className="flex justify-between items-end mb-2.5 px-3 sm:px-6 text-2xl text-black dark:text-white font-bold ">
            <span>{title}</span>
            <Link className="text-black dark:text-[#B3B3B3] text-xs" to={"/view/all"}>
              View All
            </Link>
          </p>
          <div className="h-[285px] overflow-hidden px-3 sm:px-6 grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-4">
            {playlists.map((playlist) => (
              <Playlist key={uuidv4()} playlist={playlist} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistCarousel;
