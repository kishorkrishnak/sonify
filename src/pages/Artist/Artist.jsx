import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IconContext } from "react-icons";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import PageLayout from "../../components/PageLayout/PageLayout";
import SongsTable from "../../components/SongsTable/SongsTable";
import { Artist as ArtistCard } from "../../components/cards";
import Album from "../../components/cards/Album";

import { apiRequest } from "../../services";
import { notifyLoginRequired } from "../../utils";
import formatNumberWithCommas from "../../utils/formatNumberWithCommas";
const Artist = () => {
  const [artist, setArtist] = useState(null);
  const [following, setFollowing] = useState(false);
  const { loadingRef } = useAppContext();
  const { id } = useParams();
  const [topTracks, setTopTracks] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState(null);
  const [albums, setAlbums] = useState(null);

  const { setPlayingTracks, playingTracks, isLoggedIn, setPlay, play } =
    useAppContext();
  const handlePlayClick = () => {
    if (isLoggedIn) {
      setPlayingTracks([...topTracks]);
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
        url: `/me/following?type=artist&ids=${id}`,
        method: method,
        authFlow: true,
      });

      toastMessage = following ? "Artist unfollowed" : "Artist followed";
      setFollowing(!following);
    } catch (error) {
      toastMessage = "Couldn't complete the action";
    } finally {
      toast(toastMessage);
    }
  };
  const followsArtist = async () => {
    try {
      const response = await apiRequest({
        url: `/me/following/contains?type=artist&ids=${id}`,
        authFlow: true,
      });
      setFollowing(response[0]);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
    }
  };

  const fetchRelatedArtists = async () => {
    loadingRef.current?.continuousStart();

    try {
      const response = await apiRequest({
        url: `/artists/${id}/related-artists`,
      });
      setRelatedArtists(response?.artists);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();
    }
  };

  const fetchTopTracks = async () => {
    try {
      const tracks = await apiRequest({
        url: `/artists/${id}/top-tracks?market=IN`,
      });
      setTopTracks(tracks?.tracks);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
    }
  };

  const fetchTopAlbums = async () => {
    try {
      const albums = await apiRequest({
        url: `/artists/${id}/albums`,
      });
      setAlbums(albums?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
    }
  };

  const fetchArtist = async () => {
    try {
      const artist = await apiRequest({
        url: `/artists/${id}`,
      });
      setArtist(artist);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
    }
  };
  useEffect(() => {
    fetchArtist();
    followsArtist();
    fetchTopTracks();
    fetchTopAlbums();
    fetchRelatedArtists();
  }, [id]);

  return (
    <PageLayout>
      {artist && topTracks && (
        <div className="popular flex flex-col gap- lg:gap-0 justify-between px-3 sm:px-6">
          <div className="flex pt-8 pb-5 items-center gap-5">
            <img
              src={artist?.images[0]?.url}
              className="h-[180px] w-[180px] md:h-[255px] md:w-[255px] rounded-md"
              alt={artist?.name}
            />
            <div className="flex flex-col">
              <h1 className="text-white mt-4">Artist</h1>

              <p className="text-white text-lg md:text-3xl font-bold mt-2">
                {artist?.name}
              </p>
              <p className="text-white mt-4">
                {formatNumberWithCommas(artist?.followers?.total)} Followers
              </p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-3 pb-5">
            {play &&
            playingTracks[0].id === topTracks[0].id &&
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

            <button
              onClick={handleFollowClick}
              className="rounded-2xl cursor-pointer scale:100 hover:scale-105 border border-grey  bg-transparent w-fit py-1 px-4 text-white"
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>

          <div className="w-[100%] flex flex-col gap-4">
            <h1 className="text-black dark:text-white text-xl font-bold">
              Popular Tracks
            </h1>

            <SongsTable songs={topTracks} showHead={false} itemsPerPage={5} />
          </div>

          <div className="mt-6 flex flex-col justify-center">
            <div className="flex justify-between items-end mb-2.5 text-2xl text-black dark:text-white font-bold ">
              <span>Albums</span>
              <Link
                className="text-black dark:text-[#B3B3B3] text-xs"
                to={"/view/all"}
              >
                View All
              </Link>
            </div>
            <div className="h-[270px] overflow-hidden grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-4">
              {albums?.map((album) => (
                <Album key={uuidv4()} album={album}></Album>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start mt-6 gap-5 sm:mb-2 lg:mb-7">
            {relatedArtists && (
              <div className="w-[100%] flex flex-col gap-4">
                <h1 className="text-black dark:text-white text-xl font-bold flex justify-between items-center">
                  Fans Also Like
                  <Link
                    className="text-black dark:text-[#B3B3B3] text-xs"
                    to={`/stats/topartists`}
                  >
                    View All
                  </Link>
                </h1>
                <div className="w-[100%] grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-y-10">
                  {relatedArtists?.slice(0, 6).map((artist) => {
                    return <ArtistCard artist={artist} key={uuidv4()} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Artist;
