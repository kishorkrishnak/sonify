import { useEffect, useState } from "react";
import { apiRequest } from "../../services";
import SongsTable from "../SongsTable/SongsTable";

const Recommendations = ({ basedOn, seedTrack }) => {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const fetchRecommendedSongs = async () => {
    try {
      const response = await apiRequest({
        url: `/recommendations?seed_tracks=${seedTrack}`,
      });

      setRecommendedSongs(response?.tracks);
    } catch (error) {
      console.error(
        "Error fetching recommended songs from Spotify API:",
        error
      );
    }
  };
  useEffect(() => {
    fetchRecommendedSongs();
  }, [seedTrack, basedOn]);

  return (
    <div className="carousel-container mt-4 pt-2 flex flex-col justify-center gap-4">
      <div>
        <p className="text-black dark:text-white text-xl font-bold">
          Recommended
        </p>
        <p className="text-black dark:text-[#a6a6a6] text-xs font-bold">
          Based On This {basedOn}
        </p>
      </div>
      {recommendedSongs && (
        <SongsTable
          songs={recommendedSongs.slice(0, 5)}
          itemsPerPage={5}
          showHead={false}
        />
      )}
    </div>
  );
};

export default Recommendations;
