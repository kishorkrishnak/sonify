import React from "react";
import SearchResultThumbnail from "./SearchResultThumbnail";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../App";

const SearchResult = ({ data, imageSrc, name }) => {
  console.log(data);
  const navigate = useNavigate();
  const { setPlayingTrack } = useAppContext();
  return (
    <div
      onClick={() => {
        if (data.type === "track") return setPlayingTrack(data);
        navigate(`/${data.type}/${data?.id}`);
      }}
      className="hover:bg-[#3C3E4D] flex items-center justify-start gap-2 ml-1 cursor-pointer"
    >
      <SearchResultThumbnail src={imageSrc} />

      <p className="text-white ">{data?.name}</p>
    </div>
  );
};

export default SearchResult;
