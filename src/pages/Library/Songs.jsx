import { PageLayout } from "../../components/layout";
import { Loader } from "../../components/misc";
import SongsTable from "../../components/sections/SongsTable";

const LikedSongs = () => {
  const favoriteSongs = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
  const renderFavoriteSongs = () => {
    if (!favoriteSongs) {
      return <Loader size={40} />;
    }
    return <SongsTable songs={favoriteSongs} showHead={false} />;
  };

  return (
    <PageLayout>
      <div className="carousel-container px-3 sm:px-6 pb-9 pt-2 flex flex-col justify-center">
        <p className="mb-5 text-2xl text-black dark:text-white font-bold">
          Songs
        </p>

          {renderFavoriteSongs()}
      </div>
    </PageLayout>
  );
};

export default LikedSongs;
