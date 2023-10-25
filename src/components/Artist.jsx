import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Artist = ({ artist }) => {
  const [artistInfo, setArtistInfo] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/token");
        const accessToken = data;
        const artistResponse = await axios.get(
          `https://api.spotify.com/v1/artists/${artist.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setArtistInfo(artistResponse.data);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
      }
    };
    fetchAccessToken();
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
