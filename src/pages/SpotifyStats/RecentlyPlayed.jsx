import { useEffect, useState } from "react";
import { useAppContext } from "../../App";
import SongsTable from "../../components/SongsTable/SongsTable";
import PageLayout from "../../components/PageLayout/PageLayout";

import { apiRequest } from "../../services";

const RecentlyPlayed = () => {
  const { loadingRef } = useAppContext();

  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState(null);
  const fetchRecentlyPlayed = async () => {
    loadingRef.current?.continuousStart();

    try {
      const response = await apiRequest({
        url: `/me/player/recently-played?limit=50`,
        authFlow: true,
      });

      const tracks = response.items.map((item) => item.track);
      setRecentlyPlayedSongs(tracks);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();
    }
  };

  useEffect(() => {
    fetchRecentlyPlayed();
  }, []);

  return (
    <PageLayout>
      <div className="carousel-container px-3 sm:px-6 pb-9 pt-2 flex flex-col justify-center">
        <p className="mb-5 text-2xl text-black dark:text-white font-bold">
          Recently Played Songs
        </p>

        {recentlyPlayedSongs && (
          <SongsTable
            songs={recentlyPlayedSongs}
            itemsPerPage={20}
            showHead={false}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default RecentlyPlayed;
