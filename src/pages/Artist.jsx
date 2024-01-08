import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../App";
import { Artist as ArtistCard } from "../components/cards";
import { PageLayout } from "../components/layout";
import SongsTable from "../components/sections/SongsTable";
import { apiRequest } from "../services";
import { IconContext } from "react-icons";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
import { notifyLoginRequired } from "../utils";
const Artist = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loadingRef } = useAppContext();
  const { id } = useParams();
  const [topTracks, setTopTracks] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState(null);

  const [showMore, setShowMore] = useState(false);
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
  const handleShowClick = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  const fetchRelatedArtists = async () => {
    loadingRef.current?.continuousStart();

    setLoading(true);
    try {
      const response = await apiRequest({
        url: `/artists/${id}/related-artists`,
      });
      console.log(response);
      setRelatedArtists(response?.artists);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();

      setLoading(false);
    }
  };

  const fetchTopTracks = async () => {
    loadingRef.current?.continuousStart();

    setLoading(true);
    try {
      const tracks = await apiRequest({
        url: `/artists/${id}/top-tracks?market=IN`,
      });
      setTopTracks(tracks?.tracks);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();

      setLoading(false);
    }
  };
  const fetchArtist = async () => {
    setLoading(true);
    loadingRef.current?.continuousStart();

    setLoading(true);
    try {
      const artist = await apiRequest({
        url: `/artists/${id}`,
      });
      setArtist(artist);
      console.log(artist);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();

      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArtist();
    fetchTopTracks();
    fetchRelatedArtists();
  }, [id]);

  return (
    <PageLayout>
      {artist && topTracks && (
        <div className="popular flex flex-col gap- lg:gap-0 justify-between px-3 sm:px-6">
          <div className="flex pt-8 pb-5 items-center gap-5">
            <img
              src={artist?.images[0]?.url}
              className="h-[255px] w-[255px] rounded-md"
              alt={artist?.name}
            />
            <div className="flex flex-col">
              <p className="text-white text-3xl font-bold">{artist?.name}</p>
              <p className="text-white mt-4">
                {artist?.followers?.total} Followers
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

            <button className="rounded-2xl cursor-pointer scale:100 hover:scale-105 border border-grey  bg-transparent w-fit py-1 px-4 text-white">
              Follow
            </button>
          </div>

          <div className="w-[100%] flex flex-col gap-4">
            <h1 className="text-black dark:text-white text-xl font-bold">
              Popular Tracks
            </h1>

            <SongsTable
              songs={topTracks?.slice(0, showMore ? topTracks.length : 5)}
              showHead={false}
            />

            <Link
              className="text-black dark:text-[#B3B3B3] dark:hover:text-white  text-xs pl-3 sm:pl-6"
              to={`#`}
              onClick={(e) => handleShowClick(e)}
            >
              {showMore ? "Show Less" : "Show More"}
            </Link>
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
