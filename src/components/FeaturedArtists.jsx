import React, { useEffect, useState } from "react";
import Artist from "./Artist";
import axios from "axios";

const FeaturedArtists = () => {
  const [popularArtists, setPopularArtists] = useState([]);
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/token");
        const accessToken = data;

        const artistsResponse = await axios.get(
          "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        
        const uniqueArtists = new Set();
        const popularArtists = artistsResponse.data.items.reduce((acc, item) => {
          const artistName = item.track.artists[0].name;
          if (!uniqueArtists.has(artistName)) {
            uniqueArtists.add(artistName);
            acc.push(item.track.artists[0]);
          }
          return acc;
        }, []);
        
        setPopularArtists(popularArtists);

        setPopularArtists(popularArtists);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
      }
    };
    fetchAccessToken();
  }, []);
  return (
    <div className="flex flex-col items-start px-3 sm:px-6 mt-6 gap-5 mb-24 sm:mb-2">
      <p className="text-3xl text-black dark:text-white font-bold">
        Featured Artists
      </p>

      <div className="flex w-[100%] flex-wrap gap-5 justify-between sm:justify-start">
        {popularArtists &&
          popularArtists.slice(0, 14).map((artist, index) => {
            return <Artist artist={artist} key={index} />;
          })}
      </div>
    </div>
  );
};

export default FeaturedArtists;
