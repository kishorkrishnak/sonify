import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useIsVisible } from "../../hooks";
import { apiRequest } from "../../services/api";
import Playlist from "../cards/Playlist";

const PlaylistCarousel = ({ id, title }) => {
  const elemRef = useRef();
  const isVisible = useIsVisible(elemRef);

  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await apiRequest({
          url: `/browse/categories/${id}/playlists`,
        });

        setPlaylists(response?.playlists?.items || []);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };

    if (isVisible) fetchPlaylists();
  }, [isVisible]);

  return (
    <div ref={elemRef} className="flex flex-col justify-center pb-4">
      {isVisible && playlists && (
        <>
          <div className="text-2xl font-bold mb-2.5 px-3 sm:px-6 flex justify-between items-end text-black dark:text-white">
            <span>{title}</span>
            <Link
              to={`/category/${id}`}
              state={{ title: title }}
              className="text-xs text-black dark:text-[#B3B3B3]"
            >
              View All
            </Link>
          </div>
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
