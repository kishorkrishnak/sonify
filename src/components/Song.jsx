import React, { useState } from "react";
import Heart from "react-heart";
import { FaPause, FaPlay } from "react-icons/fa";
const Song = ({ song }) => {
  const [heartActive, setHeartActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  function convertMsToMinSec(duration_ms) {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return (
    <div className="w-[100%] flex justify-between px-4 py-2 rounded-lg bg-[#F6F6F6] dark:bg-[#3C3E4D]">
      <div className="flex items-center justify-center gap-3">
        <img
          src={song?.track?.album?.images[0]?.url}
          alt="song-thumbnail"
          className="h-[38px] w-[38px] rounded-md"
        />
        <div className="flex flex-col items-start justify-center ml-1">
          <p className="text-black dark:text-white text-md font-semibold">
            {song?.track?.name}
          </p>
          <p className="text-[#EF6A61] text-xs">
            {" "}
            {song.track?.artists[0]?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-14">
        <p className="text-xs text-black dark:text-white">
          {convertMsToMinSec(song.track.duration_ms)}
        </p>
        <div className="flex items-center justify-center gap-3">
          {playing ? (
            <FaPause
              onClick={() => setPlaying(false)}
              color="white"
              className="cursor-pointer"
            ></FaPause>
          ) : (
            <FaPlay
              onClick={() => setPlaying(true)}
              color="white"
              className="cursor-pointer"
            ></FaPlay>
          )}
          <div style={{ width: "2rem" }}>
            <Heart
              animationScale={1.25}
              inactiveColor="white"
              style={{
                height: "17px",
                fill: heartActive ? "red" : "white",
                border: "none",
              }}
              isActive={heartActive}
              onClick={() => setHeartActive(!heartActive)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;