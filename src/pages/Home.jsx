import { PageLayout } from "../components/layout";
import FeaturedArtists from "../components/sections/FeaturedArtists";
import FeaturedPlaylists from "../components/sections/FeaturedPlaylists";
import RecentlyPlayed from "../components/sections/RecentlyPlayed";
import RomancePlaylists from "../components/sections/RomancePlaylists";
import TopPlaylists from "../components/sections/TopPlaylists";
import TopSongs from "../components/sections/TopSongs";
import TrendingAlbums from "../components/sections/LatestAlbums";

const Home = () => {
  return (
    <PageLayout>
      <TopSongs />
      <RecentlyPlayed/>
      <TrendingAlbums />
      <FeaturedPlaylists />
      <RomancePlaylists />
      <TopPlaylists />
      <FeaturedArtists />
    </PageLayout>
  );
};

export default Home;
