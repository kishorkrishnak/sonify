import axios from "axios";
import React, { useEffect, useState } from "react";

const TrendingAlbums = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/token");
        const accessToken = data;

        const albumsResponse = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAlbums(albumsResponse.data.albums.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchAccessToken();
  }, []);
  return (
    <h1 className="text-black dark:text-white text-3xl ml-3 sm:ml-6 font-bold">
      Trending Albums
    </h1>
  );
};

export default TrendingAlbums;
