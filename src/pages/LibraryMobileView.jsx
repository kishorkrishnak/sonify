import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PageLayout from "../components/layout/PageLayout";
import {
  AlbumLibrary,
  ArtistLibrary,
  PlaylistLibrary,
  TrackLibrary,
} from "../assets/images";

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
          <Link
            key={uuidv4()}
            to={"/library" + type?.path}
            className="flex flex-col grow w-[100%] items-center justify-center gap-3"
          >
            <div
              style={{ backgroundImage: `url(${type?.imgUrl})` }}
              className={`brightness-75 text-white bg-no-repeat bg-cover bg-center rounded-lg flex items-center justify-center w-[100%] h-[220px]`}
            >
              {" "}
              <p className="z-40 brightness-100">{type.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
};

export default LibraryMobileView;
