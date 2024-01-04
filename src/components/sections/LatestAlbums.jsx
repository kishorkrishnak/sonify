import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
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
    <div className="carousel-container pb-8 flex flex-col justify-center">
      <p className="mb-5 px-3 sm:px-6 text-2xl text-black dark:text-white font-bold ">
        Latest Albums
      </p>
     <div className="px-7">
     <Slider {...settings}>
        {albums?.map((album) => (
          <Album key={uuidv4()} album={album}></Album>
        ))}
      </Slider>
     </div>
    </div>
  );
};
export default LatestAlbums;
