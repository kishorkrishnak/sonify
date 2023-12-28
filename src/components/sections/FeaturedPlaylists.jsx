import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { apiRequest } from "../../utils/api";
import Playlist from "../cards/Playlist";

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
    <div className="carousel-container px-7 pb-9 pt-2 flex flex-col justify-center">
      <p className="mb-5 text-3xl text-black dark:text-white font-bold ">
        Featured Playlists
      </p>
      <Slider {...settings}>
        {playlists.map((playlist, index) => (
          <Playlist key={index} playlist={playlist} />
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedPlaylists;
