import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../App";
import { PageLayout } from "../components/layout";
import SongsTable from "../components/sections/SongsTable";
import { apiRequest } from "../services";

import formatMilliseconds from "../utils/formatMilliseconds";
const Album = () => {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const minutes = album?.tracks?.items?.reduce((total, current) => {
    return total + Number(current.duration_ms);
  }, 0);

  const { loadingRef } = useAppContext();

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchArtist = async () => {
      setLoading(true);
      try {
        loadingRef.current?.continuousStart();

        const album = await apiRequest({
          url: `https://api.spotify.com/v1/albums/${id}`,
        });
        setAlbum(album);
        console.log(album);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        loadingRef.current?.complete();
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  return (
    <PageLayout>
      {album && (
        <div className="flex flex-col">
          <div className="popular flex flex-col py-6  gap-6 lg:gap-0 justify-between px-3 sm:px-6">
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

                <Link
                  to={`/artist/${album?.artists[0]?.id}`}
                  className="text-white mt-2"
                >
                  {album?.artists[0]?.name}
                </Link>

                <h1 className="text-white">
                  {album?.total_tracks} Songs • {formatMilliseconds(minutes)}{" "}
                  mins
                </h1>
              </div>
            </div>
          </div>
          <SongsTable songs={album?.tracks?.items} />
        </div>
      )}
    </PageLayout>
  );
};

export default Album;
