import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "../components/layout";

const PlaylistBuilder = () => {
  const [query, setQuery] = useState("");
  
  return (
    <PageLayout>
      <div className="carousel-container gap-3 px-3 sm:px-6 pb-8 flex flex-col justify-center">
        <p className="mb-5  text-5xl text-black dark:text-white font-bold ">
          Playlist Builder
        </p>
        <p className="mb-5 text-lg text-black dark:text-white font-bold ">
          The Playlist Builder aggregrates the top tracks from the most popular
          public playlists on Spotify that match your search criteria. Looking
          for the best workout tracks? Enter the term workout and we'll find the
          tracks that have appeared most frequently in workout playlists.
        </p>

        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Enter a keyword"
          type="text"
          className="w-[100%] sm:w-[700px] p-3 outline-none rounded-md"
        />
        <Link
          to={"/playlistbuilder/results"}
          state={{ query: query }}
          className="rounded-md bg-[#232323]  w-fit p-3 text-white mt-3"
        >
          Find Playlists
        </Link>

        
      </div>
    </PageLayout>
  );
};

export default PlaylistBuilder;
