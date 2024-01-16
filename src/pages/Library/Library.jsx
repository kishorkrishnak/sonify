import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  AlbumLibrary,
  ArtistLibrary,
  PlaylistLibrary,
  TrackLibrary,
} from "../../assets/images";
import PageLayout from "../../components/PageLayout/PageLayout";
import LibraryType from "./LibraryType";

const LibraryMobileView = () => {


  const types = [
    {
      name: "Artists",
      imgUrl: ArtistLibrary,
      path: "/artists",
    },
    {
      name: "Playlists",
      imgUrl: PlaylistLibrary,
      path: "/playlists",
    },
    {
      name: "Albums",
      imgUrl: AlbumLibrary,
      path: "/albums",
    },
    {
      name: "Songs",
      imgUrl: TrackLibrary,
      path: "/songs",
    },
  ];
  return (
    <PageLayout>
      <h1 className="text-black dark:text-white text-2xl ml-6 font-bold">
        Library
      </h1>
      <div className="grid grid-cols-2 justify-items-center pt-5 px-3 sm:px-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-10">
        {types.map((type) => (
          <LibraryType key={uuidv4()} type={type} />
        ))}
      </div>
    </PageLayout>
  );
};

export default LibraryMobileView;
