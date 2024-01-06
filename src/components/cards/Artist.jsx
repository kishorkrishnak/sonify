import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../utils/api";

const Artist = ({ artist }) => {
  const [artistInfo, setArtistInfo] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistInfo = await apiRequest({
          url: `/artists/${artist?.id}`,
        });
        setArtistInfo(artistInfo);
        console.log(artistInfo);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchArtist();
  }, [artist?.id]);

  return (
    <>
      {artistInfo && (
        <Link
          className={`grow h-[260px] sm:h-fit px-4 py-4 pb-7 flex flex-col justify-center items-center text-black dark:text-white gap-1 w-[100%] rounded-md bg-[#F6F6F6] dark:bg-[#212121] hover:bg-[#999999] dark:hover:bg-[#333333]`}
          to={`/artist/${artistInfo?.id}`}
        >
          <img
            className="h-[145px] w-[145px] rounded-full"
            src={artistInfo?.images[0]?.url}
            alt="artist"
          />
          <h1 className="flex justify-start w-full text-sm sm:text-md mt-2">
            {artistInfo?.name}
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
