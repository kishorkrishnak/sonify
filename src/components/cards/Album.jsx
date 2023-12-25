import React from "react";

const Album = ({ album }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-[140px]">
      <img
        className="h-[140px] w-[140px] rounded-lg"
        src={album.images[0].url}
        alt=""
      />
      <p className="text-white text-sm">{album.name.substring(0, 15)} {album.name.length >= 10 && "..."}</p>
    </div>
  );
};

export default Album;
