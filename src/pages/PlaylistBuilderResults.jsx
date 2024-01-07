import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageLayout } from "../components/layout";
import { apiRequest } from "../services";


const PlaylistBuilderResults = () => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state.query || null);
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylistsAndTracks = async () => {
      if (query) {
        setPlaylists([]);
        setTracks([]);
        setLoading(true);
        try {
          let offset = 0;

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

            offset += 20;

            if (offset >= searchResults.playlists.total) {
              break;
            }
          }
        } catch (error) {
          console.error("Error fetching data from Spotify API:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPlaylistsAndTracks();
  }, [query]);

  return (
    <PageLayout>
      <div className="carousel-container gap-3 px-3 sm:px-6 pb-8 flex flex-col justify-center">
        <p className="mb-5  text-5xl text-black dark:text-white font-bold ">
          Matching Playlists For {query.toUpperCase()}
        </p>
        <p className="mb-5 text-lg text-black dark:text-white font-bold ">
          We've found {playlists.length} matching playlists with total of{" "}
          {tracks.length} tracks
        </p>
        <p className="mb-5 text-lg text-black dark:text-white font-bold ">
          Press Find top tracks to build a playlist of the top tracks across all
          of these playlists or go back and refine your query.
        </p>

        <button className="rounded-md bg-[#232323]  w-fit p-3 text-white mt-3">
          Find Top Tracks
        </button>
        <button
          onClick={() => {
            console.log(tracks);
            console.log(playlists);
          }}
          className="rounded-md bg-[#232323]  w-fit p-3 text-white mt-3"
        >
          Log
        </button>
      </div>
    </PageLayout>
  );
};

export default PlaylistBuilderResults;
