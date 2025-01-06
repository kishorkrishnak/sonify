import { v4 as uuidv4 } from "uuid";

import FeaturedArtists from "../../components/sections/FeaturedArtists";
import Hero from "../../components/sections/Hero";
import TrendingAlbums from "../../components/sections/LatestAlbums";
import PlaylistCarousel from "../../components/sections/PlaylistCarousel";
import RecentlyPlayed from "../../components/sections/RecentlyPlayed";
import TopSongs from "../../components/sections/TopSongs";

const Home = () => {
  const playlistCategories = [
    "EDM",
    "Top Playlists",
    "Top Bollywood",
    "Romance",
    "Mood",
    "Indie Playlists",
  ];

  return (
    <>
      <Hero />
      <TrendingAlbums />
      <TopSongs />
      <RecentlyPlayed />
      {playlistCategories.map((playlistCategory) => (
        <PlaylistCarousel
          key={uuidv4()}
          name={playlistCategory}
          title={playlistCategory}
        />
      ))}
      <FeaturedArtists />
    </>
  );
};

export default Home;
