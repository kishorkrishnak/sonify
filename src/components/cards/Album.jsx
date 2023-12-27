import { useNavigate } from "react-router-dom";

const Album = ({ album }) => {
  const navigate = useNavigate();

  const handleAlbumClick = () => {
    navigate(`/album/${album.id}`);
  };

  return (
    <div
      onClick={handleAlbumClick}
      className="cursor-pointer flex flex-col justify-center items-start gap-2 w-[140px] top-0 duration-200 hover:relative hover:top-[-10px] transition-all z-20"
    >
      <img
        className="h-[140px] w-[145px] rounded-md"
        src={album.images[0]?.url || "default_image_url"}
        alt="album"
      />
      <p className="text-black dark:text-white text-sm">
        {album.name.substring(0, 15)} {album.name.length >= 10 && "..."}
      </p>
    </div>
  );
};

export default Album;
