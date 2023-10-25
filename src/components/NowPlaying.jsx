import React from "react";
import {
  FaFastBackward,
  FaFastForward,
  FaHeart
} from "react-icons/fa";
import { IoPause } from "react-icons/io5";

const NowPlaying = ({ song }) => {
  return (
    <div className="w-[100vw] left-0 fixed bottom-[70px] sm:bottom-0 bg-[#F6F6F6] dark:bg-[#3C3E4D] flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center gap-4">
          <FaFastBackward color="white" size={21}></FaFastBackward>
          <IoPause color="white" size={30}></IoPause>
          <FaFastForward color="white" size={21}>
            {" "}
          </FaFastForward>
        </div>
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
      </div>

      <div>
        <FaHeart color="white"></FaHeart>
      </div>
    </div>
  );
};

export default NowPlaying;
