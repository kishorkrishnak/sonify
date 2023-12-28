import { useEffect, useState } from "react";
import { Song } from "../cards";
import { useAppContext } from "../../App";
import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";
import { notifyLoginRequired } from "../../utils";
import Heart from "react-heart";

const RecentlyPlayed = () => {
  const [heartActive, setHeartActive] = useState(false);
   
    const { play, setPlay, playingTrack, isLoggedIn, setPlayingTrack } = useAppContext();

  const [recentlyPlayedTrack, setRecenlyPlayedTrack] = useState();
  useEffect(() => {
    let recentlyPlayed = JSON.parse(
      localStorage.getItem("recentlyPlayedTrack")
    );
    if (recentlyPlayed) setRecenlyPlayedTrack(recentlyPlayed);
  }, [playingTrack]);

  return (
    <>
      {recentlyPlayedTrack ? (
        <div className="carousel-container px-3 sm:px-6 pb-9 pt-2 flex flex-col justify-center">
          <p className="mb-5 text-2xl text-black dark:text-white font-bold ">
            Recently Played
          </p>

          <div className="rounded-md p-2 flex items-center justify-between gap-3 bg-[#1B1B1B] w-[100%] sm:w-[500px]">
            <div className="flex items-center justify-center gap-2">
              <img
                className="rounded-md h-[50px] w-[50px]"
                src={recentlyPlayedTrack?.album?.images[0]?.url}
                alt="track"
              />
              <div className="flex flex-col items-start justify-center ml-1">
                <p className="text-black dark:text-white text-md font-semibold">
                  {recentlyPlayedTrack?.name}
                </p>
                <p className="text-[#EF6A61] text-xs">
                  {recentlyPlayedTrack?.artists[0]?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              {play && recentlyPlayedTrack?.id === playingTrack?.id ? (
                <IconContext.Provider
                  value={{ color: "white", className: "pauseIcon" }}
                >
                  <FaPause
                    onClick={() => setPlay(false)}
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
                        setPlayingTrack(recentlyPlayedTrack);
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
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RecentlyPlayed;
