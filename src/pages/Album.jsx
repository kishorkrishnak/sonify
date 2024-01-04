import { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { useParams } from "react-router-dom";
import TableSong from "../components/cards/TableSong";
import { PageLayout } from "../components/layout";
import { apiRequest } from "../utils";
import formatMilliseconds from "../utils/formatMilliseconds";
import TaskList from "../components/loaders/ListLoading";
const Album = () => {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const minutes = album?.tracks?.items?.reduce((total, current) => {
    return total + Number(current.duration_ms);
  }, 0);

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchArtist = async () => {
      setLoading(true);
      try {
        const album = await apiRequest({
          url: `https://api.spotify.com/v1/albums/${id}`,
        });
        setAlbum(album);
        console.log(album);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  return (
    <PageLayout>
      <div className="flex flex-col">
        <div className="popular flex flex-col gap-6 lg:gap-0 justify-between px-3 sm:px-6">
          <div className="flex items-center gap-5">
            <img
              src={album?.images[0]?.url}
              className="h-[180px] w-[170px] rounded-lg"
              alt={album?.name}
            />
            <div className="flex flex-col">
              <h1 className="text-white text-sm">Album</h1>

              <h1 className="text-white text-4xl font-bold mt-2">
                {album?.name}
              </h1>

              <h1 className="text-white mt-2">{album?.artists[0]?.name}</h1>

              <h1 className="text-white">
                {album?.total_tracks} Songs • {formatMilliseconds(minutes)} mins
              </h1>
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
            {album?.tracks?.items?.map((track, index) => {
              return (
                <TableSong track={track} index={index} key={index}></TableSong>
              );
            })}
              <div className="pl-4 flex justify-stretch bg-red-400 w-[100%]">
           <TaskList/>
            </div>
          </tbody>
        </table>
        <div></div>
      </div>
    </PageLayout>
  );
};

export default Album;
