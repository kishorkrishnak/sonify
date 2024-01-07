import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import { PageLayout } from "../components/layout";
import { notifyLoginRequired } from "../utils";

const PlaylistBuilder = () => {
  const [query, setQuery] = useState("");
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  const handleFindPlaylistClick = () => {
    if (!isLoggedIn) return notifyLoginRequired();
    navigate("/playlistbuilder/results", { state: { query: query } });
  };

  return (
    <PageLayout>
      <div className="mt-7 carousel-container gap-3 px-3 sm:px-6 pb-12 flex flex-col justify-center items-center">
        <p className="mb-5 text-4xl md:text-5xl text-black dark:text-white font-bold ">
          Playlist Builder
        </p>
        <p className="mb-5 text-lg text-black dark:text-white text-center">
          The Playlist Builder aggregrates the top tracks from the most popular
          public playlists on Spotify that match your search criteria.
        </p>

        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Enter a keyword (Eg: Phonk)"
          type="text"
          className="w-[100%] sm:w-[700px] p-3 outline-none rounded-md"
        />
        <button
          onClick={handleFindPlaylistClick}
          className="rounded-md bg-green-600 hover:bg-green-700  w-fit py-3 px-4 text-white mt-3"
        >
          Find Playlists
        </button>
      </div>
    </PageLayout>
  );
};

export default PlaylistBuilder;
