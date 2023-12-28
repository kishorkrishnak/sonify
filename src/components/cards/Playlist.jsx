import { useNavigate } from "react-router-dom";
import TextTruncate from "react-text-truncate";

const Playlist = ({ playlist }) => {
  const navigate = useNavigate();

  const handlePlaylistClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <div className="flex items-center justify-center w-fit p-4 pb-6  bg-[#212121] hover:bg-[#333333] rounded-md cursor-pointer">
      <div
        onClick={handlePlaylistClick}
        className="flex flex-col justify-center items-start gap-2 w-[145px] duration-200 transition-all z-20"
      >
        <img
          className="h-[145px] w-[145px] rounded-md"
          src={playlist.images[0]?.url || "default_image_url"}
          alt={`Playlist: ${playlist.name}`}
        />
        <p className="text-black dark:text-white text-sm mt-2 font-bold">
          {playlist.name.substring(0, 15)} {playlist.name.length >= 10 && "..."}
        </p>
        <TextTruncate
          line={2}
          className="text-black dark:text-[#A9A9A9] text-sm mt-2"
          element="p"
          truncateText="…"
          text={playlist?.description}
        />
      </div>
    </div>
  );
};

export default Playlist;
