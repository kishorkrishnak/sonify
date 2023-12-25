import React from "react";
import SearchResultThumbnail from "./SearchResultThumbnail";

const SearchResult = ({ imageSrc, name }) => {
  return (
    <div className="flex items-center justify-start gap-2 ml-1 cursor-pointer">
      <SearchResultThumbnail src={imageSrc} />

      <p className="text-white ">{name}</p>
    </div>
  );
};

export default SearchResult;
