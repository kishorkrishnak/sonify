import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/api";
import { Artist } from "../cards";

const FeaturedArtists = () => {
  const [popularArtists, setPopularArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedArtists = async () => {
      setLoading(true);
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

        setPopularArtists(popularArtists);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedArtists();
  }, []);

  return (
    <div className="flex flex-col items-start px-3 sm:pr-6 pl-6 sm:pl-7 mt-6 gap-5 sm:mb-2 lg:mb-7 ">
      <p className="text-2xl text-black dark:text-white font-bold">
        Featured Artists
      </p>

      <div className="flex w-[100%] flex-wrap gap-x-6 gap-y-10 sm:justify-start">
        {popularArtists &&
          popularArtists.slice(0, 12).map((artist, index) => {
            return <Artist artist={artist} key={index} />;
          })}
      </div>
    </div>
  );
};

export default FeaturedArtists;
