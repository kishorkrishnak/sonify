import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../utils/api";

const Artist = ({ artist }) => {
  const [artistInfo, setArtistInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      try {
        const artistInfo = await apiRequest({
          url: `https://api.spotify.com/v1/artists/${artist.id}`,
        });
        setArtistInfo(artistInfo);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, []);
  return (
    <>
      {artistInfo && (
        <Link
          style={{
            backgroundImage: `url(${artistInfo.images[0].url})`,
          }}
          className={`top-0 duration-200 hover:relative hover:top-[-10px] transition-all flex justify-center items-end bg-cover bg-center h-[195px] w-[46%] sm:w-[160px] rounded-lg`}
          to={`/artist/${artistInfo.id}`}
        >
          <h1 className="backdrop-blur py-0.5 rounded-b-lg w-[100%] flex justify-center items-center text-white font-medium">
            {artistInfo.name}
          </h1>
        </Link>
      )}
    </>
  );
};

export default Artist;
