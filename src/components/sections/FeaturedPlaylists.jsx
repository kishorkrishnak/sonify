import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import { apiRequest } from "../../utils/api";
import Playlist from "../cards/Playlist";
import { Link } from "react-router-dom";

const FeaturedPlaylists = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,

    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 968, settings: { slidesToShow: 3 } },
      { breakpoint: 1100, settings: { slidesToShow: 4 } },
      { breakpoint: 1370, settings: { slidesToShow: 5 } },
      { breakpoint: 2000, settings: { slidesToShow: 6 } },
    ],
  };

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchFeaturedPlaylists = async () => {
      try {
        const response = await apiRequest({
          url: "https://api.spotify.com/v1/browse/featured-playlists",
        });

        setPlaylists(response?.playlists?.items || []);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };

    fetchFeaturedPlaylists();
  }, []);

  return (
    <div className="carousel-container pb-2 flex flex-col justify-center">
      <p className="flex justify-between items-end mb-2.5 px-3 sm:px-6 text-2xl text-black dark:text-white font-bold ">
        <span>Featured Playlists</span>
        <Link className="text-[#B3B3B3] text-xs" to={"/view/all"}>
          View All
        </Link>
      </p>
      <div className="h-[290px] overflow-hidden px-3 sm:px-6 grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-4">
        {playlists.map((playlist) => (
          <Playlist key={uuidv4()} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPlaylists;
