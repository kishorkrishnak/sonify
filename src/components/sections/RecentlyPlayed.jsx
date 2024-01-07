import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../App";
import HeartButton from "./HeartButton";
import PlayButton from "./PlayButton";

const RecentlyPlayed = () => {
  const { playingTrack } = useAppContext();
  const [recentlyPlayedTrack, setRecentlyPlayedTrack] = useState();

  useEffect(() => {
    let recentlyPlayed = JSON.parse(
      localStorage.getItem("recentlyPlayedTrack")
    );
    if (recentlyPlayed) setRecentlyPlayedTrack(recentlyPlayed);
  }, [playingTrack]);

  return (
    <>
      {recentlyPlayedTrack && (
        <div className="flex flex-col justify-center px-3 sm:px-6 pt-2 pb-9">
          <p className="text-2xl font-bold mb-5 text-black dark:text-white">
            Recently Played
          </p>

          <div className="w-full sm:w-[500px] p-2 bg-[#F6F6F6] dark:bg-[#212121] hover:bg-[#999999] dark:hover:bg-[#333333] rounded-md flex items-center justify-between gap-3">
            <div className="flex items-center justify-center gap-2">
              <img
                className="w-[50px] h-[50px] rounded-md"
                src={recentlyPlayedTrack?.album?.images[0]?.url}
                alt="track"
              />
              <div className="ml-1 flex flex-col items-start justify-center">
                <Link
                  to={`/track/${recentlyPlayedTrack?.id}`}
                  className="text-md font-semibold text-black dark:text-white"
                >
                  {recentlyPlayedTrack?.name}
                </Link>
                <Link
                  to={`/artist/${recentlyPlayedTrack?.artists[0]?.id}`}
                  className="text-xs text-black dark:text-[#A6A6A6]"
                >
                  {recentlyPlayedTrack?.artists[0]?.name}
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <PlayButton song={recentlyPlayedTrack} />
              <HeartButton song={recentlyPlayedTrack} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyPlayed;
