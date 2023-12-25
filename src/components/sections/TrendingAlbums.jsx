import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/api";
const TrendingAlbums = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    const fetchTrendingAlbums = async () => {
      try {
        const albums = await apiRequest({
          url: "https://api.spotify.com/v1/browse/new-releases",
        });
        setAlbums(albums?.albums?.items);
        console.log(albums?.albums?.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchTrendingAlbums();
  }, []);
  return (
    <h1 className="text-black dark:text-white text-3xl ml-3 sm:ml-6 font-bold">
      Trending Albums
    </h1>
  );
};

export default TrendingAlbums;
