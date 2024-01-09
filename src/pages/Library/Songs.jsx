import { useEffect, useState } from "react";
import { PageLayout } from "../../components/layout";
import { Loader } from "../../components/misc";
import SongsTable from "../../components/sections/SongsTable";
import { apiRequest } from "../../services";
import { useAppContext } from "../../App";

const LikedSongs = () => {
  const { loadingRef } = useAppContext();

  const [savedSongs, setSavedSongs] = useState(null);
  const fetchSavedSongs = async () => {
    loadingRef.current?.continuousStart();

    try {
      const response = await apiRequest({
        url: `/me/tracks`,
        authFlow: true,
      });
      const tracks = response?.items.map((item) => item.track);
      setSavedSongs(tracks);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();
    }
  };

  useEffect(() => {
    fetchSavedSongs();
  },[]);
  const renderFavoriteSongs = () => {
    if (!savedSongs) {
      return <Loader size={40} />;
    }
    return <SongsTable songs={savedSongs} showHead={false} />;
  };

  return (
    <PageLayout>
      <div className="carousel-container px-3 sm:px-6 pb-9 pt-2 flex flex-col justify-center">
        <p className="mb-5 text-2xl text-black dark:text-white font-bold">
          Your Songs
        </p>

        {renderFavoriteSongs()}
      </div>
    </PageLayout>
  );
};

export default LikedSongs;
