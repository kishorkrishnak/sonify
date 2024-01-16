import { useEffect, useRef, useState } from "react";
import useIsVisible from "../../hooks/useIsVisible";
import { apiRequest } from "../../services/api";
import ArtistsGrid from "./ArtistsGrid";

const FeaturedArtists = () => {
  const [popularArtists, setPopularArtists] = useState([]);
  const elemRef = useRef();
  const isVisible = useIsVisible(elemRef);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchFeaturedArtists = async () => {
      try {
        const response = await apiRequest({
          url: `/search?q=year:${currentYear}&type=artist`,
        });

        setPopularArtists(response.artists?.items.slice(0, 12));
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    if (isVisible) fetchFeaturedArtists();
  }, [isVisible]);

  return (
    <div
      ref={elemRef}
      className="flex flex-col items-start px-3 sm:px-6 mt-6 gap-5 sm:mb-2 lg:mb-7"
    >
      {isVisible && popularArtists && (
        <>
          <p className="text-xl sm:text-2xl text-black dark:text-white font-bold">
            Featured Artists
          </p>
          <ArtistsGrid artists={popularArtists} />
        </>
      )}
    </div>
  );
};

export default FeaturedArtists;
