import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils";

const Album = ({ album }) => {
  const navigate = useNavigate();

  const handleAlbumClick = () => {
    navigate(`/album/${album.id}`);
  };

  return (
    <div className="w-full p-4 pb-6 bg-[#F6F6F6] dark:bg-[#212121] hover:bg-[#999999] dark:hover:bg-[#333333] rounded-md cursor-pointer grow flex justify-center transition-all items-center">
      <div
        className="w-[145px] duration-200 transition-all flex flex-col justify-center items-start gap-2 z-20"
        onClick={handleAlbumClick}
      >
        <img
          className="h-[145px] w-[145px] rounded-md"
          src={album.images[0]?.url || "default_image_url"}
          alt="album"
        />
        <p className="text-sm text-black dark:text-white">
          {truncateText(album.name, 15)}
        </p>
        <p className="text-xs text-black dark:text-[#A6A6A6]">
          {album?.release_date?.substring(0, 4)}
        </p>
        <p className="text-xs text-black dark:text-[#A6A6A6]">
          {album?.artists[0]?.name}
        </p>
      </div>
    </div>
  );
};

export default Album;
