import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pop } from "../../assets/images";
import { apiRequest } from "../../utils/api";
import { Song } from "../cards";
import { Loader } from "../misc";
const TopSongs = () => {
  const [topSongs, setTopSongs] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopSongs = async () => {
      setLoading(true);
      try {
        const response = await apiRequest({
          url: "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
        });

        setTopSongs(response?.tracks?.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSongs();
  }, []);

  const renderTopSongs = () => {
    if (!topSongs) {
      return <Loader size={40} />;
    }

    return topSongs
      .slice(0, 6)
      .map((song, index) => <Song key={index} song={song.track} />);
  };

  return (
    <div className="popular flex flex-col pb-9 gap-6 lg:gap-0 lg:flex-row justify-between px-3 sm:px-6">
      {/* Section 1: Popular */}
      <div className="w-full lg:w-[48%] flex flex-col items-start justify-start gap-8">
        <p className="text-3xl text-black dark:text-white font-bold">Popular</p>
        <Link
          to={"/category/0JQ5DAqbMKFGvOw3O4nLAf"}
          state={{title:"K-Pop"}}
          
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${Pop})`,
          }}
          className="cursor-pointer flex items-center justify-center rounded-lg min-h-[300px] h-[100%] w-full"
        >
          <p className="text-white font-bold text-5xl">K-Pop</p>
        </Link>
      </div>

      {/* Section 2: Top Songs */}
      <div className="w-full lg:w-[48%] flex flex-col items-start justify-start gap-6">
        <p className="text-3xl text-black dark:text-white font-bold">
          Top Songs
        </p>
        <div className="flex flex-col justify-start items-center gap-1 relative h-full w-full">
          {renderTopSongs()}
        </div>
      </div>
    </div>
  );
};

export default TopSongs;
