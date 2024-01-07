import { useEffect, useState } from "react";
import Heart from "react-heart";
import { IconContext } from "react-icons";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../App";
import { PageLayout } from "../components/layout";
import { apiRequest } from "../services";

import { convertMsToMinSec, notifyLoginRequired } from "../utils";
const Track = () => {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loadingRef } = useAppContext();
  const { id } = useParams();
  const [heartActive, setHeartActive] = useState(false);
  const { setPlayingTrack, playingTrack, isLoggedIn, setPlay, play } =
    useAppContext();
  const handlePlayPauseClick = () => {
    if (isLoggedIn) {
      setPlayingTrack(track);
      setPlay(!play);
    } else {
      notifyLoginRequired();
    }
  };
  const handleHeartClick = (song) => {
    const previousFavorites =
      JSON.parse(localStorage.getItem("favoriteSongs")) || [];

    if (heartActive) {
      const updatedFavorites = previousFavorites.filter(
        (favorite) => favorite.id !== song.id
      );
      localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites));
      setHeartActive(false);
    } else {
      previousFavorites.push(song);
      localStorage.setItem("favoriteSongs", JSON.stringify(previousFavorites));
      setHeartActive(true);
    }
  };
  useEffect(() => {
    const isFavorite = (
      JSON.parse(localStorage.getItem("favoriteSongs")) || []
    ).some((favoriteSong) => favoriteSong.id === track?.id);

    if (isFavorite) setHeartActive(true);
  }, [track?.id]);
  useEffect(() => {
    const fetchTrack = async () => {
      setLoading(true);
      loadingRef.current?.continuousStart();

      setLoading(true);
      try {
        const track = await apiRequest({
          url: `/tracks/${id}`,
        });
        setTrack(track);
        console.log(track);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        loadingRef.current?.complete();

        setLoading(false);
      }
    };
    fetchTrack();
  }, [id]);

  return (
    <PageLayout>
      {track && (
        <div className="flex flex-col gap-6 lg:gap-0 justify-between px-3 sm:px-6">
          <div className="flex items-center gap-5 py-10">
            <img
              src={track?.album?.images[0]?.url}
              className="h-[255px] w-[255px] rounded-md"
              alt={track?.artists[0]?.name}
            />
            <div className="flex flex-col">
              <h1 className="text-white mt-4">
                {track?.followers?.total} Song
              </h1>

              <h1 className="text-white text-5xl font-bold mt-2">
                {track?.name}
              </h1>
              <h1 className="text-white mt-5">
                <Link
                  className="font-bold"
                  to={`/artist/${track?.artists[0]?.id}`}
                >
                  {track?.artists[0]?.name}
                </Link>{" "}
                •{" "}
                <Link to={`/album/${track?.album?.id}`}>
                  {track?.album?.name}
                </Link>{" "}
                • <span>{track?.album?.release_date.substring(0, 4)} • </span>
                <span>{convertMsToMinSec(track?.duration_ms)} </span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col py-5">
            <div className="flex items-center justify-start gap-5">
              {play && track?.id === playingTrack?.id ? (
                <IconContext.Provider value={{ color: "white" }}>
                  <IoPauseCircleSharp
                    onClick={handlePlayPauseClick}
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
                    onClick={handlePlayPauseClick}
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
                    fill: heartActive ? "red" : "transparent",
                    stroke: heartActive ? "" : "grey",
                  }}
                  isActive={heartActive}
                  onClick={() => handleHeartClick(track)}
                />
              </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-5">
              <h1>Lyrics</h1>
              <p>bla bla</p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Track;
