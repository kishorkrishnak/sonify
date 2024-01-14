import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import { Pop } from "../../assets/images";
import { apiRequest } from "../../services/api";
import { Song } from "../cards";
import { MoonLoader } from "../loaders";

const TopSongs = () => {
  const [topSongs, setTopSongs] = useState(null);
  const { loadingRef } = useAppContext();

  useEffect(() => {
    const fetchTopSongs = async () => {
      loadingRef.current?.continuousStart();

      try {
        const response = await apiRequest({
          url: "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
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
      <div className="w-full lg:w-[48%] flex flex-col gap-5 items-start justify-start">
        <p className="text-2xl font-bold text-black dark:text-white">Popular</p>
        <Link
          to={"/category/0JQ5DAqbMKFGvOw3O4nLAf"}
          state={{ title: "K-Pop" }}
          className="w-full h-full flex items-center justify-center cursor-pointer bg-cover bg-center rounded-lg min-h-[300px] sm:min-h-[500px] lg:min-h-[300px]"
          style={{ backgroundImage: `url(${Pop})` }}
        >
          <p className="text-white font-bold text-5xl">K-Pop</p>
        </Link>
      </div>

      <div className="w-full lg:w-[48%] flex flex-col items-start justify-start gap-4">
        <p className="text-2xl font-bold text-black dark:text-white">
          Top Songs
        </p>
        <div className="w-full h-full flex flex-col items-center justify-start gap-1 relative">
          {renderTopSongs()}
        </div>
      </div>
    </div>
  );
};

export default TopSongs;
