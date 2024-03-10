import { FaChartBar } from "react-icons/fa";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import PageLayout from "../../components/PageLayout/PageLayout";

import { notifyLoginRequired } from "../../utils";
const Intro = ({ image, title, description }) => {
  return (
    <div className="flex justify-center items-center gap-5">
      {image}
      <div className="flex flex-col justify-center items-start gap-3 w-[100%] md:w-[600px]">
        <h1 className="text-white text-2xl">{title}</h1>
        <p className="text-black dark:text-[#A6A6A6]">{description}</p>
      </div>
    </div>
  );
};
const SpotifyStats = () => {
  const { isLoggedIn } = useAppContext();

  const navigate = useNavigate();
  const handleButtonClick = (e, path) => {
    e.preventDefault();
    if (!isLoggedIn) return notifyLoginRequired();

    navigate(`/stats/${path}`);
  };
  return (
    <>
      <div className="border-b border-[#a7a7a7] gap-3 py-14 flex flex-col items-center justify-center">
        <p className="text-3xl text-black dark:text-white font-bold ">
          Stats for Spotify
        </p>
        <p className="text-black dark:text-white">
          Choose what you want to see:
        </p>
        <div className="flex flex-col items-center justify-center gap-3 mt-7">
          <Link
            onClick={(e) => handleButtonClick(e, "toptracks")}
            className="rounded-md bg-green-700 p-2 text-white w-[300px] flex justify-center items-center"
          >
            Top Tracks
          </Link>
          <Link
            onClick={(e) => handleButtonClick(e, "topartists")}
            className="rounded-md bg-green-700 p-2 text-white w-[300px] flex justify-center items-center"
          >
            Top Artists
          </Link>
          <Link
            onClick={(e) => handleButtonClick(e, "topgenres")}
            className="rounded-md bg-green-700 p-2 text-white w-[300px] flex justify-center items-center"
          >
            Top Genres
          </Link>
          <Link
            onClick={(e) => handleButtonClick(e, "recentlyplayed")}
            className="rounded-md bg-green-700 p-2 text-white w-[300px] flex justify-center items-center"
          >
            Recently Played
          </Link>
        </div>
      </div>

      <div className="flex flex-col px-6 justify-center items-center gap-14 mt-10 py-9">
        <Intro
          image={<FaChartBar color="white" size={100} />}
          title={"Your own charts"}
          description={
            "Create a playlist from your personal charts and listen to them directly in your spotify app"
          }
        />

        <Intro
          image={<MdOutlineFeaturedPlayList color="white" size={100} />}
          title={"Create playlist"}
          description={
            "Create a playlist from your personal charts and listen to them directly in your spotify app"
          }
        />

        <Intro
          image={<TbPlayerTrackPrevFilled color="white" size={100} />}
          title={"Recently played tracks"}
          description={"Check out your recently played tracks with timestamps"}
        />
      </div>
    </>
  );
};

export default SpotifyStats;
