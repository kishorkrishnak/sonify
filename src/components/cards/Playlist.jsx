import { useNavigate } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import { PlaylistIcon } from "../../assets/images";
import { cleanHtmlTags, truncateText } from "../../utils";

const Playlist = ({ playlist }) => {
  const navigate = useNavigate();

  const handlePlaylistClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <>
      {playlist && (
        <div
          onClick={handlePlaylistClick}
          className="grow flex items-center justify-center w-[100%] p-4 pb-6 bg-[#F6F6F6] dark:bg-[#212121] hover:bg-[#999999] dark:hover:bg-[#333333] rounded-md cursor-pointer"
        >
          <div className="flex flex-col justify-center items-start gap-2 w-[145px] duration-200 transition-all z-20">
            <img
              className="h-[145px] w-[145px] rounded-md"
              src={playlist?.images[0]?.url || PlaylistIcon}
              alt={`Playlist: ${playlist?.name}`}
            />
            <p className="text-black dark:text-white text-sm mt-2 font-bold">
              {truncateText(playlist?.name, 15)}
            </p>
            <TextTruncate
              line={2}
              className="text-black dark:text-[#A9A9A9] text-sm mt-2"
              element="p"
              truncateText="…"
              text={cleanHtmlTags(playlist?.description)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Playlist;
