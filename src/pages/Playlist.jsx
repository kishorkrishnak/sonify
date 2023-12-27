import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { useParams } from "react-router-dom";
import TableSong from "../components/cards/TableSong";
import { PageLayout } from "../components/layout";
import { apiRequest } from "../utils";
import formatMilliseconds from "../utils/formatMilliseconds";
const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
    const minutes = playlist?.tracks?.items?.reduce((total, current) => {
      return total + Number(current.duration_ms);
    }, 0);

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const playlist = await apiRequest({
          url: `https://api.spotify.com/v1/playlists/${id}`,
        });
      
        setPlaylist(playlist);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  return (
    <PageLayout>
      <div className="flex flex-col">
        <div className="popular flex flex-col gap-6 lg:gap-0 justify-between px-3 sm:px-6">
          <div className="flex items-center gap-5">
            <img
              src={playlist?.images[0]?.url}
              className="h-[180px] w-[170px] rounded-lg"
              alt={playlist?.name}
            />
            <div className="flex flex-col">
              <h1 className="text-white text-3xl font-bold">
                {playlist?.name}
              </h1>

              <h1 className="text-white ">{playlist?.description}</h1>

              <div className="flex gap-2 items-center justify-center">
                {/* {album?.} */}
              </div>
              <h1 className="text-white">
                {playlist?.tracks?.total} Songs • {formatMilliseconds(minutes)} mins
              </h1>

              <h1 className="text-white">{playlist?.followers?.total} Fans</h1>
            </div>
          </div>
        </div>

        <table className="text-black dark:text-white mt-8 ">
          <thead className="border-b border-[grey] ">
            <tr>
              <td className="pl-3 sm:pl-6 text-[grey] pb-2">#</td>
              <td className="text-[grey]">Title</td>
              <td className="pr-3 sm:pr-6 text-[grey]">
                {" "}
                <CiClock2 color="grey" />
              </td>
              <td></td>
            </tr>
          </thead>

          <tbody>
            {playlist?.tracks?.items?.map((track, index) => {
              return (
                <TableSong
                  track={track.track}
                  index={index}
                  key={index}
                ></TableSong>
              );
            })}
          </tbody>
        </table>
        <div></div>
      </div>
    </PageLayout>
  );
};

export default Playlist;
