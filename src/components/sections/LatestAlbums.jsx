import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { apiRequest } from "../../utils/api";
import { Album } from "../cards";
const LatestAlbums = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1100, 
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1370, 
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 2000, 
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchLatestAlbums = async () => {
      try {
        const albums = await apiRequest({
          url: "https://api.spotify.com/v1/browse/new-releases",
        });
        setAlbums(albums?.albums?.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchLatestAlbums();
  }, []);
  return (
    <div className="carousel-container px-7 pb-9 pt-2 flex flex-col justify-center">
      <p className="mb-5 text-3xl text-black dark:text-white font-bold ">
        Latest Albums
      </p>
      <Slider {...settings}>
        {albums?.map((album, index) => (
          <Album key={index} album={album}></Album>
        ))}
      </Slider>
    </div>
  );
};
export default LatestAlbums;
