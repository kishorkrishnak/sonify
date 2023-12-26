import React from "react";
import { useNavigate } from "react-router-dom";

const Album = ({ album }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/album/${album.id}`)}
      className="cursor-pointer flex flex-col justify-center items-start gap-2 w-[140px] top-0 duration-200 hover:relative hover:top-[-10px] transition-all z-20"
    >
      <img
        className="h-[140px] w-[140px] rounded-lg"
        src={album.images[0].url}
        alt=""
      />
      <p className="text-white text-sm">
        {album.name.substring(0, 15)} {album.name.length >= 10 && "..."}
      </p>
    </div>
  );
};

export default Album;
