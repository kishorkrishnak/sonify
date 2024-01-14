import { useEffect, useState } from "react";
import { useAppContext } from "../../App";
import SongsTable from "../../components/SongsTable/SongsTable";
import PageLayout from "../../components/PageLayout/PageLayout";

import { apiRequest } from "../../services";

const SongsLibrary = () => {
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
  }, []);

  return (
    <PageLayout>
      <div className="carousel-container px-3 sm:px-6 pb-9 pt-2 flex flex-col justify-center">
        <p className="mb-5 text-2xl text-black dark:text-white font-bold">
          Your Songs
        </p>

        {savedSongs && (
          <SongsTable songs={savedSongs} itemsPerPage={20} showHead={false} />
        )}
      </div>
    </PageLayout>
  );
};

export default SongsLibrary;
