import React, { useEffect, useState } from "react";
import Heart from "react-heart";
import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../../App";
import { notifyLoginRequired } from "../../utils";
import convertMsToMinSec from "../../utils/convertMsToMinSec";
import AudioSpinner from "../loaders/AudioSpinner";
import HeartButton from "../sections/HeartButton";

const TableSong = ({ index, track }) => {
  const handleHeartClick = (song) => {
    const previousFavorites =
      JSON.parse(localStorage.getItem("favoriteSongs")) || [];

    if (heartActive) {
      const updatedFavorites = previousFavorites.filter(
        (favorite) => favorite.id !== song.id
      );
      localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites));
      setHeartActive(false);
    } else {
      previousFavorites.push(song);
      localStorage.setItem("favoriteSongs", JSON.stringify(previousFavorites));
      setHeartActive(true);
    }
  };

  useEffect(() => {
    const isFavorite = (
      JSON.parse(localStorage.getItem("favoriteSongs")) || []
    ).some((favoriteSong) => favoriteSong.id === track.id);

    if (isFavorite) setHeartActive(true);
  }, [track.id]);

  const { playingTrack, setPlayingTrack, isLoggedIn, setPlay, play } =
    useAppContext();

  const [heartActive, setHeartActive] = useState(false);

  return (
    <tr className="cursor-pointer hover:bg-[#E0E0E0] dark:hover:bg-[#3C3E4D]">
      <td className="py-4 rounded-l-md pl-3 sm:pl-6 w-[60px]">
        {play && track?.id === playingTrack?.id ? (
          <AudioSpinner
            height={20}
            width={20}
            color={"#AFB42B"}
            radius={9}
            wrapperStyle={{ marginLeft: -4 }}
          />
        ) : (
          index + 1
        )}
      </td>
      <td>
        <div className="flex items-center gap-3">
          {track?.album?.images[0] && (
            <img
              className="h-[37px] w-[37px] rounded-md"
              src={track.album.images[0].url}
              alt="album"
            />
          )}

          <div>
            <Link to={`/track/${track?.id}`} className="text-sm sm:text-md">
              {track?.name}
            </Link>

            <p className="text-black dark:text-[#A6A6A6] text-xs">
              {track?.artists?.map((artist, index) => (
                <React.Fragment key={artist?.id}>
                  <Link to={`/artist/${artist?.id}`}>{artist?.name}</Link>
                  {index !== track.artists.length - 1 && ", "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </td>
      <td className="text-sm sm:text-md rounded-r-sm pr-3 sm:pr-6 ">
        {convertMsToMinSec(track?.duration_ms)}
      </td>

      <td>
        <div className="flex items-center justify-center gap-3">
          {play && track?.id === playingTrack?.id ? (
            <IconContext.Provider
              value={{ color: "white", className: "pauseIcon" }}
            >
              <FaPause
                onClick={() => setPlay(false)}
                color="white"
                className="cursor-pointer"
              />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{ color: "white", className: "playIcon" }}
            >
              <FaPlay
                onClick={() => {
                  if (isLoggedIn) {
                    setPlayingTrack(track);
                    setPlay(true);
                  } else {
                    notifyLoginRequired();
                  }
                }}
                className="cursor-pointer"
              />
            </IconContext.Provider>
          )}
          <HeartButton
            heartActive={heartActive}
            handleHeartClick={() => handleHeartClick(track)}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableSong;
