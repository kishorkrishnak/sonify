import { Link } from "react-router-dom";
import { convertMsToMinSec } from "../../utils";
import HeartButton from "../sections/HeartButton";
import PlayButton from "../sections/PlayButton";
import { apiRequest } from "../../services";
import { useEffect, useState } from "react";

const Song = ({ song }) => {
  const [saved, setSaved] = useState(false);
  const isSaved = async () => {
    try {
      const response = await apiRequest({
        url: `/me/tracks/contains?&ids=${song?.id}`,
        authFlow: true,
      });
      setSaved(response[0]);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
    }
  };

  useEffect(() => {
    isSaved();
  }, []);
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
            className="text-black dark:text-[white] text-sm md:text-md font-semibold"
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
          <PlayButton song={song} />
          <HeartButton song={song}  />
        </div>
      </div>
    </div>
  );
};

export default Song;
