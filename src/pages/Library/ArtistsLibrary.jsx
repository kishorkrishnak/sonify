import React from "react";
import PageLayout from "../../components/PageLayout/PageLayout";


const ArtistsLibrary = () => {
  return (
    <>
      <div className="carousel-container px-3 sm:px-6 pb-9 pt-2 flex flex-col justify-center">
        <p className="mb-5 text-2xl text-black dark:text-white font-bold ">
          Artists
        </p>

        <div className="flex flex-col justify-start items-center gap-2  h-full w-full"></div>
      </div>
    </>
  );
};

export default ArtistsLibrary;
