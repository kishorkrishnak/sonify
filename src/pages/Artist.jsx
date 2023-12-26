import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/layout";
import { apiRequest } from "../utils/api";

const Artist = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchArtist = async () => {
      setLoading(true);
      try {
        const artist = await apiRequest({
          url: `https://api.spotify.com/v1/artists/${id}`,
        });
        setArtist(artist);
        console.log(artist);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  return (
    <PageLayout>
      <div className="popular flex flex-col gap-6 lg:gap-0 justify-between px-3 sm:px-6">
        <div className="flex items-center gap-5">
          <img
            src={artist?.images[0]?.url}
            className="h-[255px] w-[255px] rounded-full"
            alt={artist?.name}
          />
          <div className="flex flex-col">
            <h1 className="text-white text-3xl font-bold">{artist?.name}</h1>
            <h1 className="text-white mt-4">{artist?.followers?.total} Fans</h1>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Artist;
