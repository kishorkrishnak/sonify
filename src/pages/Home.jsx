import { PageLayout } from "../components/layout";
import FeaturedArtists from "../components/sections/FeaturedArtists";
import FeaturedPlaylists from "../components/sections/FeaturedPlaylists";
import TopSongs from "../components/sections/TopSongs";
import TrendingAlbums from "../components/sections/TrendingAlbums";

const Home = () => {
  return (
    <PageLayout>
      <TrendingAlbums></TrendingAlbums>
      <TopSongs></TopSongs>
      <FeaturedPlaylists />
      <TrendingAlbums></TrendingAlbums>
      <TrendingAlbums></TrendingAlbums>
      <FeaturedArtists></FeaturedArtists>
    </PageLayout>
  );
};

export default Home;
