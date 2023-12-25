import { PageLayout } from "../components/layout";
import FeaturedArtists from "../components/sections/FeaturedArtists";
import TopSongs from "../components/sections/TopSongs";
import TrendingAlbums from "../components/sections/TrendingAlbums";
const Home = () => {
  return (
    <PageLayout>
      <TrendingAlbums></TrendingAlbums>
      <TopSongs></TopSongs>
      <FeaturedArtists></FeaturedArtists>
    </PageLayout>
  );
};

export default Home;
