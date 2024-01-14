import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../App";
import SongsTable from "../../components/SongsTable/SongsTable";
import PageLayout from "../../components/PageLayout/PageLayout";

import { apiRequest } from "../../services";

const PlaylistBuilderResults = () => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state.query || null);
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const { loadingRef } = useAppContext();

  useEffect(() => {
    const fetchPlaylistsAndTracks = async () => {
      loadingRef.current?.continuousStart();

      if (query) {
        setPlaylists([]);
        setTracks([]);
        try {
          let offset = 0;
          let totalTracks = 0;

          while (true) {
            const searchResults = await apiRequest({
              url: `https://api.spotify.com/v1/search?q=${query}&type=playlist&offset=${offset}`,
            });

            setPlaylists((prevPlaylists) => [
              ...prevPlaylists,
              ...(searchResults?.playlists?.items || []),
            ]);

            const playlistItems = searchResults?.playlists?.items || [];
            const playlistTracks = await Promise.all(
              playlistItems.map(async (playlist) => {
                const tracksResponse = await apiRequest({
                  url: playlist?.tracks?.href,
                });
                return tracksResponse.items;
              })
            );

            setTracks((prevTracks) => [
              ...prevTracks,
              ...playlistTracks.flat(),
            ]);

            totalTracks += playlistTracks.flat().length;
            offset += 20;
            if (offset >= searchResults.playlists.total || totalTracks >= 100) {
              break;
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.error("Error fetching data from Spotify API:", error);
        } finally {
          loadingRef.current?.complete();
        }
      }
    };

    fetchPlaylistsAndTracks();
  }, [query]);

  return (
    <PageLayout>
      <div className="carousel-container gap-3 px-3 sm:px-6 pb-8 flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="mb-5 text-4xl text-black dark:text-white font-bold">
            Top {query} Tracks
          </p>
          <p className="mb-5 text-lg text-black dark:text-white font-bold ">
            We've found {playlists.length} matching playlists with total of{" "}
            {tracks.length} tracks
          </p>
          <p className="mb-5 text-lg text-black dark:text-white font-bold ">
            Here are the top 100 workout tracks. You can save these as your own
            Spotify playlist by clicking the button.
          </p>
          <button
            onClick={() => {
              console.log(tracks);
              console.log(playlists);
            }}
            className="rounded-md bg-[#232323]  w-fit p-3 text-white mt-3"
          >
            Log
          </button>
          <button className="rounded-md bg-green-600 hover:bg-green-700 w-fit py-3 px-5 text-white mt-3">
            Save Playlist to Spotify
          </button>
        </div>

        {tracks && (
          <SongsTable songs={tracks.slice(0, 100)} itemsPerPage={20} />
        )}
      </div>
    </PageLayout>
  );
};

export default PlaylistBuilderResults;
