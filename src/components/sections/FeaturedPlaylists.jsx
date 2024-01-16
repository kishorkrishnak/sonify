import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../services/api";
import PlaylistsGrid from "./PlaylistsGrid";

const FeaturedPlaylists = () => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchFeaturedPlaylists = async () => {
      try {
        const response = await apiRequest({
          url: "/browse/featured-playlists",
        });

        setPlaylists(response?.playlists?.items || []);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };

    fetchFeaturedPlaylists();
  }, []);

  return (
    <>
      {playlists && (
        <div className="carousel-container pb-2 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-2.5 px-3 sm:px-6 text-2xl text-black dark:text-white font-bold">
          <p className="text-xl sm:text-2xl">Featured Playlists</p>
            <Link
              className="text-black dark:text-[#B3B3B3] text-xs"
              to={"/view/all"}
            >
              View All
            </Link>
          </div>

          <div className=" px-3 sm:px-6 ">
            <PlaylistsGrid playlists={playlists} height={285} />
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedPlaylists;
