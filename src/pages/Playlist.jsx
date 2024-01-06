import { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import TableSong from "../components/cards/TableSong";
import { PageLayout } from "../components/layout";
import { useAppContext } from "../App";
import { apiRequest } from "../utils";
import formatMilliseconds from "../utils/formatMilliseconds";
import SongsTable from "../components/sections/SongsTable";
const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const minutes = playlist?.tracks?.items?.reduce((total, { track }) => {
    return total + Number(track.duration_ms);
  }, 0);
  const { id } = useParams();
  const { loadingRef } = useAppContext();
  useEffect(() => {
    setLoading(true);
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        loadingRef.current?.continuousStart();
        const playlist = await apiRequest({
          url: `playlists/${id}`,
        });

        setPlaylist(playlist);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        loadingRef.current?.complete();
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);
  return (
    <PageLayout>
      {playlist && (
        <div className="rounded-md flex flex-col">
          <div className="rounded-md px-3 sm:px-6 py-6 flex flex-col gap-6 lg:gap-0 justify-between">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <img
                src={playlist?.images[0]?.url}
                className="h-[180px] w-[180px] rounded-lg"
                alt={playlist?.name}
              />
              <div className="flex flex-col">
                <h1 className="text-white text-sm">Playlist</h1>

                <h1 className="texy-black dark:text-white text-xl md:text-5xl font-bold mt-2">
                  {playlist?.name}
                </h1>

                <h1 className="text-white mt-3">{playlist?.description}</h1>

                <h1 className="text-white text-sm mt-1">
                  {playlist?.tracks?.total} Songs •{" "}
                  {formatMilliseconds(minutes)} mins
                </h1>

                <h1 className="text-white text-sm mt-1">
                  {playlist?.followers?.total} Followers
                </h1>
              </div>
            </div>
          </div>

          <SongsTable songs={playlist?.tracks?.items} />
        </div>
      )}
    </PageLayout>
  );
};

export default Playlist;
