import { useNavigate } from "react-router-dom";

const Album = ({ album }) => {
  const navigate = useNavigate();

  const handleAlbumClick = () => {
    navigate(`/album/${album.id}`);
  };

  return (
    <div className="flex items-center justify-center w-fit p-4 pb-6 bg-[#F6F6F6] dark:bg-[#212121] hover:bg-[#999999] dark:hover:bg-[#333333] rounded-md cursor-pointer">
      <div
        onClick={handleAlbumClick}
        className="flex flex-col justify-center items-start gap-2 w-[145px] duration-200 transition-all z-20"
      >
        <img
          className="h-[145px] w-[145px] rounded-md"
          src={album.images[0]?.url || "default_image_url"}
          alt="album"
        />
        <p className="text-black dark:text-white text-sm">
          {album.name.substring(0, 15)} {album.name.length >= 10 && "..."}
        </p>

        <p className="text-black dark:text-[#A6A6A6]  text-xs">
          {album?.release_date?.substring(0, 4)}
        </p>
        <p className="text-black dark:text-[#A6A6A6] text-xs">
          {album?.artists[0]?.name}
        </p>
      </div>
    </div>
  );
};

export default Album;
