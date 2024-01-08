import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../App";
import convertMsToMinSec from "../../utils/convertMsToMinSec";
import AudioLoader from "../loaders/AudioLoader";
import HeartButton from "../sections/HeartButton";
import PlayButton from "../sections/PlayButton";

const TableSong = ({ index, track }) => {
  const { play, currentTrackId } = useAppContext();

  const isTrackPlaying = play && track?.id === currentTrackId;

  return (
    <tr className="cursor-pointer hover:bg-[#E0E0E0] dark:hover:bg-[#3C3E4D]">
      <td className="py-4 pl-3 sm:pl-6 rounded-l-md w-[60px]">
        {isTrackPlaying ? (
          <AudioLoader
            height={20}
            width={20}
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
              className="w-[37px] h-[37px] rounded-md"
              src={track.album.images[0].url}
              alt="album"
            />
          )}

          <div>
            <Link to={`/track/${track?.id}`} className="text-sm sm:text-md">
              {track?.name}
            </Link>

            <p className="text-xs text-black dark:text-[#A6A6A6]">
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
      <td className="rounded-r-sm pr-3 sm:pr-6 text-md text-sm sm:text-md">
        {convertMsToMinSec(track?.duration_ms)}
      </td>

      <td>
        <div className="flex items-center justify-center gap-3">
          <PlayButton song={track} />
          <HeartButton song={track} />
        </div>
      </td>
    </tr>
  );
};

export default TableSong;
