import FeaturedArtists from "../components/FeaturedArtists";
import { PageLayout } from "../components/layout";
import TopSongs from "../components/TopSongs";
import TrendingAlbums from "../components/TrendingAlbums";
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
