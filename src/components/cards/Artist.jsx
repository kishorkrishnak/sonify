import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../services/api";

const Artist = ({ artist }) => {
  const [artistImage, setArtistImage] = useState(null);

  useEffect(() => {
    const fetchArtistImage = async () => {
      try {
        const artistInfo = await apiRequest({
          url: `/artists/${artist?.id}`,
        });
        setArtistImage(artistInfo?.images[0]?.url);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchArtistImage();
  }, [artist?.id]);

  return (
    <>
      {artistImage && (
        <Link
          className={`grow w-[100%] h-[260px] sm:h-fit px-4 py-4 pb-7 flex flex-col justify-center items-center text-black dark:text-white gap-1 w-[100%] rounded-md bg-[#F6F6F6] dark:bg-[#212121] hover:bg-[#999999] transition-all dark:hover:bg-[#333333]`}
          to={`/artist/${artist?.id}`}
        >
          <img
            className="h-[145px] w-[145px] rounded-full"
            src={artistImage}
            alt="artist"
          />
          <h1 className="flex justify-start w-full text-sm sm:text-md mt-2">
            {artist?.name}
          </h1>
          <p className="flex justify-start w-full text-xs sm:text-sm text-black dark:text-[#A6A6A6]">
            Artist
          </p>
        </Link>
      )}
    </>
  );
};

export default Artist;
