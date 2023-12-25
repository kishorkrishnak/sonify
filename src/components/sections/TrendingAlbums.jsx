import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { apiRequest } from "../../utils/api";
import { Album } from "../cards";
const TrendingAlbums = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll:1,
    responsive: [
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 968, // For screens smaller than 768px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1100, // For screens smaller than 768px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1370, // For screens smaller than 1024px
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 2000, // For screens smaller than 1024px
        settings: {
          slidesToShow: 7,
        },
      },
    ],
  };

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
    <div className="carousel-container px-7 pb-9 pt-2 flex flex-col justify-center">
      <p className="mb-5 text-3xl text-black dark:text-white font-bold ">
        Trending Albums
      </p>
      <Slider {...settings}>
        {albums?.map((album, index) => (
          <Album key={index} album={album}></Album>
        ))}
      </Slider>
    </div>
  );
};
export default TrendingAlbums;
