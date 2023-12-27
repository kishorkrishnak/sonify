import { useNavigate } from "react-router-dom";

const Playlist = ({ playlist }) => {
  const navigate = useNavigate();

  const handlePlaylistClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <div
      onClick={handlePlaylistClick}
      className="cursor-pointer flex flex-col justify-center items-start gap-2 w-[140px] top-0 duration-200 hover:relative hover:top-[-10px] transition-all z-20"
    >
      <img
        className="h-[140px] w-[145px] rounded-lg"
        src={playlist.images[0]?.url || "default_image_url"}
        alt={`Playlist: ${playlist.name}`}
      />
      <p className="text-black dark:text-white text-sm">
        {playlist.name.substring(0, 15)} {playlist.name.length >= 10 && "..."}
      </p>
    </div>
  );
};

export default Playlist;
