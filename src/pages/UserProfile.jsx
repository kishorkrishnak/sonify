import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../App";
import { Artist, TableSong } from "../components/cards";
import { PageLayout } from "../components/layout";
import PlaylistsGrid from "../components/sections/PlaylistsGrid";
import { apiRequest } from "../services";

const UserProfile = () => {
  const location = useLocation();
  const profile = location.state?.profile;

  const [loading, setLoading] = useState(false);
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  const { loadingRef } = useAppContext();
  const fetchUserPlaylists = async () => {
    setLoading(true);
    try {
      const playlists = await apiRequest({
        url: "/me/playlists",
        authFlow: true,
      });
      setPlaylists(playlists?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopArtists = async () => {
    loadingRef.current?.continuousStart();
    setLoading(true);
    try {
      const artists = await apiRequest({
        url: `/me/top/artists?time_range=long_term&limit=6`,
        authFlow: true,
      });
      setTopArtists(artists?.items);
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
        url: `/me/top/tracks?time_range=short_term&limit=4`,
        authFlow: true,
      });
      setTopTracks(tracks?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopTracks();
    fetchUserPlaylists();
    fetchTopArtists();
  }, [profile]);

  return (
    <PageLayout>
      <div className="flex flex-col px-3 sm:px-6">
        <div className="gap-7 py-14 flex items-center justify-start">
          <img
            src={profile?.images[1]?.url}
            className="h-[230px] w-[230px] rounded-full"
            alt={profile?.display_name}
          />
          <div className="flex flex-col items-start justify-center gap-3">
            <p className="text-sm text-black dark:text-white font-bold ">
              Profile
            </p>
            <p className="text-6xl text-black dark:text-white font-bold ">
              {profile?.display_name}
            </p>

            <p className="text-sm mt-4 text-black dark:text-white font-bold ">
              {profile?.followers?.total} Followers
            </p>
          </div>
        </div>
        <div className="w-[100%] flex flex-col gap-4">
          <h1 className="text-black dark:text-white text-xl font-bold flex justify-between items-center">
            Top Tracks This Month
            <Link
              className="text-black dark:text-[#B3B3B3] text-xs"
              to={`/stats/toptracks`}
            >
              View All
            </Link>
          </h1>
          <table className="w-[100%] text-black dark:text-white">
            <tbody>
              {topTracks?.map((track, index) => {
                return (
                  <TableSong
                    track={track?.track ? track.track : track}
                    index={index}
                    key={uuidv4()}
                  ></TableSong>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-start mt-6 gap-5 sm:mb-2 lg:mb-7">
          {playlists && (
            <div className="w-[100%] flex flex-col gap-4">
              <h1 className="text-black dark:text-white text-xl font-bold flex justify-between items-center">
                Your Playlists
                <Link
                  to={"/category/your-lists"}
                  state={{ title: "Your Playlists", playlists: playlists }}
                  playlists={playlists}
                  className="text-black dark:text-[#B3B3B3] text-xs"
                >
                  View All
                </Link>
              </h1>
              <PlaylistsGrid playlists={playlists.slice(0, 6)} />
            </div>
          )}
        </div>

        <div className="flex flex-col items-start mt-3 gap-5 sm:mb-2 lg:mb-7">
          {topArtists && (
            <div className="w-[100%] flex flex-col gap-4">
              <h1 className="text-black dark:text-white text-xl font-bold flex justify-between items-center">
                Your Top Artists
                <Link
                  className="text-black dark:text-[#B3B3B3] text-xs"
                  to={`/stats/topartists`}
                >
                  View All
                </Link>
              </h1>
              <div className="w-[100%] grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-y-10">
                {topArtists?.map((artist) => {
                  return <Artist artist={artist} key={uuidv4()} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default UserProfile;
