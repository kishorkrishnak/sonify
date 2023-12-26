import React from "react";
import SearchResultThumbnail from "./SearchResultThumbnail";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ data, imageSrc, name }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${data?.id}`)}
      className="flex items-center justify-start gap-2 ml-1 cursor-pointer"
    >
      <SearchResultThumbnail src={imageSrc} />

      <p className="text-white ">{data?.name}</p>
    </div>
  );
};

export default SearchResult;
