import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import Artist from "./Artist";

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
    <div className="flex flex-col items-start px-3 sm:px-6 mt-6 gap-5 mb-24 sm:mb-2">
      <p className="text-3xl text-black dark:text-white font-bold">
        Featured Artists
      </p>

      <div className="flex w-[100%] flex-wrap gap-5 gap-y-10 justify-between sm:justify-start">
        {popularArtists &&
          popularArtists.slice(0, 14).map((artist, index) => {
            return <Artist artist={artist} key={index} />;
          })}
      </div>
    </div>
  );
};

export default FeaturedArtists;
