import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../utils/api";

const Artist = ({ artist }) => {
  const [artistInfo, setArtistInfo] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistInfo = await apiRequest({
          url: `https://api.spotify.com/v1/artists/${artist.id}`,
        });
        setArtistInfo(artistInfo);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchArtist();
  }, [artist.id]);

  return (
    <>
      {artistInfo && (
        <Link
          className={`px-4 py-5 flex flex-col justify-center items-center text-black dark:text-white gap-1 h-[160px] w-[29%] sm:h-[220px] sm:w-[162px] rounded-md bg-[#212121] hover:bg-[#333333]`}
          to={`/artist/${artistInfo.id}`}
        >
          <img
            className="rounded-full h-[80px] w-[80px] sm:h-[130px] sm:w-[130px]"
            src={artistInfo.images[0]?.url}
            alt="artist"
          />
          <h1 className="flex justify-start w-full text-sm sm:text-md">{artistInfo.name}</h1>
          <p className="flex justify-start w-full text-xs sm:text-sm text-[#A6A6A6]">
            Artist
          </p>
        </Link>
      )}
    </>
  );
};

export default Artist;
