import { useEffect, useRef, useState } from "react";
import useIsVisible from "../../hooks/useIsVisible";
import { apiRequest } from "../../services/api";
import ArtistsGrid from "./ArtistsGrid";

const FeaturedArtists = () => {
  const [popularArtists, setPopularArtists] = useState([]);
  const elemRef = useRef();
  const isVisible = useIsVisible(elemRef);

  useEffect(() => {
    const fetchFeaturedArtists = async () => {
      try {
        const artists = await apiRequest({
          url: "/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks",
        });
        const uniqueArtists = new Set();
        const popularArtists = artists?.items?.reduce((acc, item) => {
          const artistName = item?.track?.artists[0].name;
          if (!uniqueArtists.has(artistName)) {
            uniqueArtists.add(artistName);
            acc.push(item.track.artists[0]);
          }
          return acc;
        }, []);

        setPopularArtists(popularArtists.slice(0, 12));
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
          <p className="text-2xl text-black dark:text-white font-bold">
            Featured Artists
          </p>
          <ArtistsGrid artists={popularArtists} />
        </>
      )}
    </div>
  );
};

export default FeaturedArtists;
