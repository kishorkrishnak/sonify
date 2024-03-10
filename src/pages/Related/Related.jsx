import { apiRequest } from "../../services";
import { useAppContext } from "../../App";
import { useParams } from "react-router-dom";
import ArtistsGrid from "../../components/sections/ArtistsGrid";
import { useEffect, useState } from "react";

const Related = () => {
  const [relatedArtists, setRelatedArtists] = useState(null);
  const { loadingRef } = useAppContext();
  const { id } = useParams();

  const fetchRelatedArtists = async () => {
    loadingRef.current?.continuousStart();

    try {
      const response = await apiRequest({
        url: `/artists/${id}/related-artists`,
      });
      setRelatedArtists(response?.artists);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();
    }
  };
  useEffect(() => {
    fetchRelatedArtists();
  }, [id]);
  return (
    <>
      <h1 className="text-black dark:text-white text-2xl ml-6 font-bold">
        Related
      </h1>
      <div className="pt-5 px-3 sm:px-6">
        {relatedArtists && <ArtistsGrid artists={relatedArtists} />}
      </div>
    </>
  );
};

export default Related;
