import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IconContext } from "react-icons";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../App";
import { PlaylistIcon } from "../../assets/images";
import SongsTable from "../../components/SongsTable/SongsTable";
import PageLayout from "../../components/PageLayout/PageLayout";

import { apiRequest } from "../../services";
import { notifyLoginRequired } from "../../utils";
import formatMilliseconds from "../../utils/formatMilliseconds";
import formatNumberWithCommas from "../../utils/formatNumberWithCommas";
import Recommendations from "../../components/Recommendations/Recommendations";

const Playlist = () => {
  const {
    profile,
    setPlayingTracks,
    playingTracks,
    isLoggedIn,
    setPlay,
    play,
  } = useAppContext();

  const userId = profile?.id;
  const [following, setFollowing] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState(null);
  const minutes = playlist?.tracks?.items?.reduce((total, { track }) => {
    return total + Number(track?.duration_ms);
  }, 0);

  const { id } = useParams();
  const { loadingRef } = useAppContext();

  const handlePlayClick = () => {
    if (isLoggedIn) {
      setPlayingTracks([...tracks]);
      setPlay(true);
    } else {
      notifyLoginRequired();
    }
  };

  const handlePauseClick = () => {
    if (isLoggedIn) setPlay(false);
  };

  const handleFollowClick = async () => {
    if (!isLoggedIn) return notifyLoginRequired();
    let toastMessage = "";
    try {
      const method = following ? "DELETE" : "PUT";

      await apiRequest({
        url: `/playlists/${id}/followers`,
        method: method,
        authFlow: true,
      });

      toastMessage = following ? "Playlist unfollowed" : "Playlist followed";
      setFollowing(!following);
    } catch (error) {
      toastMessage = "Couldn't follow playlist";
    } finally {
      toast(toastMessage);
    }
  };

  const followsPlaylist = async () => {
    try {
      const response = await apiRequest({
        url: `/playlists/${id}/followers/contains?ids=${userId}`,
      });
      setFollowing(response[0]);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
    }
  };

  const fetchPlaylist = async () => {
    try {
      loadingRef.current?.continuousStart();
      const playlist = await apiRequest({
        url: `playlists/${id}`,
      });
      setPlaylist(playlist);
      const tracks = playlist?.tracks?.items?.map((track) => track.track);
      setTracks(tracks);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  useEffect(() => {
    if (userId) followsPlaylist();
  }, [userId]);

  console.log(playlist);
  return (
    <>
      {playlist && tracks && (
        <div className="rounded-md flex flex-col px-3 sm:px-6">
          <div className="rounded-md py-6 flex flex-col gap-6 lg:gap-0 justify-between">
            <div className="flex flex-row items-start md:items-center gap-5">
              {playlist?.images && (
                <img
                  className="h-[120px] w-[120px] sm:h-[180px] sm:w-[180px] rounded-lg"
                  src={
                    playlist?.images ? playlist?.images[0]?.url : PlaylistIcon
                  }
                  alt=""
                />
              )}

              <div className="flex flex-col">
                <h1 className="text-white text-sm">Playlist</h1>

                <h1 className="texy-black dark:text-white text-xl md:text-5xl font-bold mt-2">
                  {playlist?.name}
                </h1>

                <h1 className="hidden sm:block text-white mt-3">
                  {playlist?.description}
                </h1>

                <h1 className="text-white text-sm mt-1">
                  {playlist?.tracks?.total} Songs •{" "}
                  {formatMilliseconds(minutes)} mins
                </h1>

                <h1 className="text-white text-sm mt-1">
                  {formatNumberWithCommas(playlist?.followers?.total)} Followers
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-3 pb-5">
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
              tracks.length > 0 && (
                <IconContext.Provider value={{ color: "white" }}>
                  <IoPlayCircleSharp
                    color="#1FDF64"
                    size={60}
                    onClick={handlePlayClick}
                    className="cursor-pointer scale-100 hover:scale-105"
                  />
                </IconContext.Provider>
              )
            )}
            {playlist.owner.id !== userId && (
              <button
                onClick={handleFollowClick}
                className="rounded-2xl cursor-pointer scale:100 hover:scale-105 border border-black dark:border-white bg-transparent w-fit py-1 px-4 text-black dark:text-white"
              >
                {following ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <SongsTable songs={tracks} itemsPerPage={20} showHead />
          {tracks.length > 0 && (
            <Recommendations basedOn={"Playlist"} seedTrack={tracks[0]?.id} />
          )}
        </div>
      )}
    </>
  );
};

export default Playlist;
