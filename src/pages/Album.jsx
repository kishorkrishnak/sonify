import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../App";
import { PageLayout } from "../components/layout";
import SongsTable from "../components/sections/SongsTable";
import { apiRequest } from "../services";

import formatMilliseconds from "../utils/formatMilliseconds";
import Heart from "react-heart";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { notifyLoginRequired } from "../utils";
import toast from "react-hot-toast";
const Album = () => {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState(null);
  const [saved, setSaved] = useState(false);
  const minutes = album?.tracks?.items?.reduce((total, current) => {
    return total + Number(current.duration_ms);
  }, 0);
  const { id } = useParams();

  const { setPlayingTracks, playingTracks, isLoggedIn, setPlay, play } =
    useAppContext();

  const { loadingRef } = useAppContext();

  const handlePlayClick = () => {
    if (isLoggedIn) {
      const tracks = album?.tracks?.items.map((item) => item);
      setPlayingTracks([...tracks]);
      setPlay(true);
    } else {
      notifyLoginRequired();
    }
  };

  const handleHeartClick = async () => {
    let toastMessage = "";

    try {
      await apiRequest({
        url: `/me/albums?ids=${id}`,
        method: saved ? "DELETE" : "PUT",
        authFlow: true,
      });

      toastMessage = saved
        ? "Album removed from library"
        : "Album added to library";
      setSaved(!saved);
    } catch (error) {
      toastMessage = "Could't complete the action";
    } finally {
      toast(toastMessage);
    }
  };

  const handlePauseClick = () => {
    if (isLoggedIn) setPlay(false);
  };

  useEffect(() => {
    setLoading(true);
    const fetchArtist = async () => {
      setLoading(true);
      try {
        loadingRef.current?.continuousStart();

        const album = await apiRequest({
          url: `https://api.spotify.com/v1/albums/${id}`,
        });

        const tracks = album?.tracks?.items?.map((track) => track);
        setTracks(tracks);
        setAlbum(album);
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
      {album && tracks && (
        <div className="flex flex-col px-3 sm:px-6">
          <div className="popular flex flex-col py-6 gap-6 lg:gap-0 justify-between">
            <div className="flex items-center gap-5">
              <img
                src={album?.images[0]?.url}
                className="h-[180px] w-[180px] md:h-[255px] md:w-[255px] rounded-lg"
                alt={album?.name}
              />
              <div className="flex flex-col">
                <h1 className="text-white text-sm">Album</h1>
                <h1 className="text-white text-lg md:text-3xl  font-bold mt-2">
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

          <div className="flex items-center justify-start gap-5 pb-5">
            {play &&
            playingTracks[0].id === tracks[0]?.id &&
            playingTracks.length > 1 ? (
              <IconContext.Provider value={{ color: "white" }}>
                <IoPauseCircleSharp
                  onClick={handlePauseClick}
                  color="#1FDF64"
                  size={60}
                  className="cursor-pointer scale-100 hover:scale-105"
                />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider value={{ color: "white" }}>
                <IoPlayCircleSharp
                  color="#1FDF64"
                  size={60}
                  onClick={handlePlayClick}
                  className="cursor-pointer scale-100 hover:scale-105"
                />
              </IconContext.Provider>
            )}
            <div style={{ width: "2rem" }}>
              <Heart
                animationScale={1.25}
                inactiveColor="transparent"
                style={{
                  height: "30px",
                  fill: saved ? "red" : "transparent",
                  stroke: saved ? "" : "grey",
                }}
                isActive={saved}
                onClick={() => handleHeartClick()}
              />
            </div>
          </div>
          <SongsTable songs={tracks} showHead />
        </div>
      )}
    </PageLayout>
  );
};

export default Album;
