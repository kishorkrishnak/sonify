import { useEffect, useState } from "react";
import Heart from "react-heart";
import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../../App";
import { convertMsToMinSec, notifyLoginRequired } from "../../utils";
import HeartButton from "../sections/HeartButton";

const Song = ({ song }) => {
  const { colorTheme } = useAppContext();
  const iconColor = colorTheme === "dark" ? "white" : "black";
  const handleHeartClick = (song) => {
    const previousFavorites =
      JSON.parse(localStorage.getItem("favoriteSongs")) || [];

    if (heartActive) {
      const updatedFavorites = previousFavorites.filter(
        (favorite) => favorite?.id !== song?.id
      );
      localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites));
      setHeartActive(false);
    } else {
      previousFavorites.push(song);
      localStorage.setItem("favoriteSongs", JSON.stringify(previousFavorites));
      setHeartActive(true);
    }
  };

  const [heartActive, setHeartActive] = useState(false);
  const { setPlayingTrack, playingTrack, isLoggedIn, setPlay, play } =
    useAppContext();

  useEffect(() => {
    const isFavorite = (
      JSON.parse(localStorage.getItem("favoriteSongs")) || []
    ).some((favoriteSong) => favoriteSong?.id === song?.id);

    if (isFavorite) setHeartActive(true);
  }, [song.id]);

  const handlePlayPauseClick = () => {
    if (isLoggedIn) {
      setPlayingTrack(song);
      setPlay(!play);
    } else {
      notifyLoginRequired();
    }
  };

  return (
    <div className="w-full flex justify-between sm:pr-4 py-2">
      <div className="flex items-center justify-center gap-3">
        <img
          src={song?.album?.images[0]?.url}
          alt="song-thumbnail"
          className="h-[38px] w-[38px] rounded-md"
        />
        <div className="flex flex-col items-start justify-center ml-1">
          <Link
            to={`track/${song?.id}`}
            className="text-black dark:text-[white] text-md font-semibold"
          >
            {song?.name}
          </Link>
          <Link
            to={`artist/${song?.artists[0]?.id}`}
            className="text-black dark:text-[#A6A6A6] text-xs cursor-pointer"
          >
            {song?.artists[0]?.name}
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center gap-14">
        <p className="text-xs text-black dark:text-white">
          {convertMsToMinSec(song?.duration_ms)}
        </p>
        <div className="flex items-center justify-center gap-3">
          {play && song?.id === playingTrack?.id ? (
            <IconContext.Provider
              value={{ color: iconColor, className: "pauseIcon" }}
            >
              <FaPause
                onClick={handlePlayPauseClick}
                className="cursor-pointer"
              />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{ color: iconColor, className: "playIcon" }}
            >
              <FaPlay
                onClick={handlePlayPauseClick}
                className="cursor-pointer"
              />
            </IconContext.Provider>
          )}
          <HeartButton
            heartActive={heartActive}
            handleHeartClick={() => handleHeartClick(song)}
          />
        </div>
      </div>
    </div>
  );
};

export default Song;
