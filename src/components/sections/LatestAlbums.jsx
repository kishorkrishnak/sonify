import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import { apiRequest } from "../../utils/api";
import { Album } from "../cards";
import { Link } from "react-router-dom";

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
    <div className="pb-7 flex flex-col justify-center">
      <p className="flex justify-between items-end mb-2.5 px-3 sm:px-6 text-2xl text-black dark:text-white font-bold ">
        <span>Latest Albums</span>
        <Link className="text-[#B3B3B3] text-xs" to={"/view/all"}>
          View All
        </Link>
      </p>
      <div className="h-[270px] overflow-hidden px-3 sm:px-6 grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-4">
        {albums?.map((album) => (
          <Album key={uuidv4()} album={album}></Album>
        ))}
      </div>
    </div>
  );
};
export default LatestAlbums;
