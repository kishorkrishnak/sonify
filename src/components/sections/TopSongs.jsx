import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import {Song} from "../cards";
import { Loader } from "../misc";
const TopSongs = () => {
  const [topSongs, setTopSongs] = useState(null);
  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const songs = await apiRequest({
          url: "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
        });

        setTopSongs(songs?.tracks?.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchTopSongs();
  }, []);

  return (
    <div className="popular flex flex-col pb-9 gap-6 lg:gap-0 lg:flex-row justify-between px-3 sm:px-6">
      <div className="w-[100%] lg:w-[48%] flex flex-col items-start justify-start gap-8">
        <p className="text-3xl text-black dark:text-white font-bold">Popular</p>
        <Link
          to={"/category/pop"}
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: " url(jin.jpg)",
          }}
          className="cursor-pointer flex items-center justify-center rounded-lg min-h-[300px] h-[100%] w-[100%]"
        >
          <p className="text-white font-bold text-5xl">Pop</p>
        </Link>
      </div>
      <div className="w-[100%] lg:w-[48%] flex flex-col items-start justify-start gap-6">
        <p className="text-3xl text-black dark:text-white font-bold ">
          Top Songs
        </p>
        <div className="relative flex flex-col h-[100%] gap-1 w-[100%] mx-auto justify-start items-center">
          {topSongs ? (
            topSongs
              .slice(0, 6)
              .map((song, index) => <Song key={index} song={song}></Song>)
          ) : (
            <Loader size={40}></Loader>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSongs;
