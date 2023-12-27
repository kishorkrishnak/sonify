import { useState } from "react";
import Heart from "react-heart";
import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";
import { useAppContext } from "../../App";
import { notifyLoginRequired } from "../../utils";
import convertMsToMinSec from "../../utils/convertMsToMinSec";

const TableSong = ({ index, track }) => {
  const { playingTrack, setPlayingTrack, isLoggedIn, setPlay, play } =
    useAppContext();

  const [heartActive, setHeartActive] = useState(false);

  return (
    <tr className="cursor-pointer hover:bg-[#3C3E4D]">
      <td className="py-4 rounded-l-sm pl-3 sm:pl-6">{index + 1}</td>
      <td>{track?.name}</td>
      <td className="rounded-r-sm pr-3 sm:pr-6">
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
      </td>
    </tr>
  );
};

export default TableSong;
