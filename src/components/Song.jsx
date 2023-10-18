import React, { useState } from "react";
import Heart from "react-heart";
import { FaPause, FaPlay } from "react-icons/fa";
const Song = () => {
  const [heartActive, setHeartActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="w-[100%] flex justify-between px-4 py-2 rounded-lg bg-[#F6F6F6] dark:bg-[#3C3E4D]">
      <div className="flex items-center justify-center gap-3">
        <img
          src="https://e-cdns-images.dzcdn.net/images/cover/dd6fe7fa9267185c4b835bd4f155d1d2/56x56-000000-80-0-0.jpg"
          alt="song-thumbnail"
          className="h-[38px] w-[38px] rounded-md"
        />
        <div className="flex flex-col items-start justify-center ml-1">
          <p className="text-black dark:text-white text-md font-semibold">
            STAY
          </p>
          <p className="text-[#EF6A61] text-xs">The Kid LAROI</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-14">
        <p className="text-xs text-black dark:text-white">2:21</p>
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
