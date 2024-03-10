import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import { apiRequest } from "../../services/api";
import { Song } from "../cards";
import { MoonLoader } from "../loaders";
import PopularGenre from "./PopularGenre";

const TopSongs = () => {
  const [topSongs, setTopSongs] = useState(null);
  const { loadingRef } = useAppContext();

  useEffect(() => {
    const fetchTopSongs = async () => {
      loadingRef.current?.continuousStart();

      try {
        const response = await apiRequest({
          url: "/playlists/37i9dQZEVXbMDoHDwVN2tF",
        });

        setTopSongs(response?.tracks?.items?.slice(0, 6));
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        loadingRef.current?.complete();
      }
    };

    fetchTopSongs();
  }, []);

  const renderTopSongs = () => {
    if (!topSongs) {
      return <MoonLoader size={40} />;
    }

    return topSongs?.map((song) => <Song key={uuidv4()} song={song.track} />);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6 pb-9 px-3 sm:px-6 popular">
      <PopularGenre />

      <div className="w-full lg:w-[48%] flex flex-col items-start justify-start gap-4">
        <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">
         Global Top 
        </p>
        <div className="w-full h-full flex flex-col items-center justify-start gap-1 relative">
          {renderTopSongs()}
        </div>
      </div>
    </div>
  );
};

export default TopSongs;
