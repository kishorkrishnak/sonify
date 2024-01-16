import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../App";
import { useIsVisible } from "../../hooks";
import { apiRequest } from "../../services/api";
import PlaylistsGrid from "./PlaylistsGrid";

const PlaylistCarousel = ({ id, title }) => {
  const elemRef = useRef();
  const isVisible = useIsVisible(elemRef);
  const { loadingRef } = useAppContext();
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      loadingRef.current?.continuousStart();

      try {
        const response = await apiRequest({
          url: `/browse/categories/${id}/playlists`,
        });

        setPlaylists(response?.playlists?.items || []);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        loadingRef.current?.complete();
      }
    };

    if (isVisible) fetchPlaylists();
  }, [isVisible]);

  return (
    <div ref={elemRef} className="flex flex-col justify-center pb-4">
      {isVisible && playlists && (
        <>
          <div className="font-bold mb-2.5 px-3 sm:px-6 flex justify-between items-end text-black dark:text-white">
            <p className="text-xl sm:text-2xl">{title}</p>
            <Link
              to={`/category/${id}`}
              state={{ title: title }}
              className="text-xs text-black dark:text-[#B3B3B3]"
            >
              View All
            </Link>
          </div>
          <div className="px-3 sm:px-6">
            <PlaylistsGrid playlists={playlists} height={285} />
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistCarousel;
