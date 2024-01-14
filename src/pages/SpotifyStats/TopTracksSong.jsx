import { Fragment } from "react";
import { Link } from "react-router-dom";
import HeartButton from "../../components/sections/HeartButton";
import PlayButton from "../../components/sections/PlayButton";
import convertMsToMinSec from "../../utils/convertMsToMinSec";

const TopTracksSong = ({ index, track }) => {
  return (
    <tr className="cursor-pointer hover:bg-[#3C3E4D]">
      <td className="py-4 rounded-l-md rounded-l-md">
        <div className="flex items-center gap-3">
          <p>{index + 1}</p>
          {track?.album?.images[0] && (
            <img
              className="ml-1 sm:ml-2 h-[37px] w-[37px] rounded-md"
              src={track.album.images[0].url}
              alt="album"
            />
          )}

          <div>
            <Link to={`/track/${track?.id}`} className="text-sm sm:text-md">
              {track?.name}
            </Link>
            <p className="text-[#A6A6A6] text-xs">
              {track?.artists?.map((artist, index) => (
                <Fragment key={artist?.id}>
                  <Link to={`/artist/${artist?.id}`}>{artist?.name}</Link>
                  {index !== track.artists.length - 1 && ", "}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      </td>
      <td className="rounded-r-sm pr-3 sm:pr-6"></td>
      <td className="text-sm sm:text-md rounded-r-sm pr-3 sm:pr-6">
        {convertMsToMinSec(track?.duration_ms)}
      </td>

      <td className="rounded-r-md">
        <div className="flex items-center justify-end gap-3">
          <PlayButton song={track} />
          <HeartButton song={track} />
        </div>
      </td>
    </tr>
  );
};

export default TopTracksSong;
