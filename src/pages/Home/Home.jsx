import { v4 as uuidv4 } from "uuid";
import PageLayout from "../../components/PageLayout/PageLayout";

import FeaturedArtists from "../../components/sections/FeaturedArtists";
import FeaturedPlaylists from "../../components/sections/FeaturedPlaylists";
import TrendingAlbums from "../../components/sections/LatestAlbums";
import PlaylistCarousel from "../../components/sections/PlaylistCarousel";
import RecentlyPlayed from "../../components/sections/RecentlyPlayed";
import TopSongs from "../../components/sections/TopSongs";

const Home = () => {
  const playlistCategories = [
    { id: "0JQ5DAqbMKFHOzuVTgTizF", title: "EDM" },
    { id: "toplists", title: "Top Playlists" },
    { id: "0JQ5DAqbMKFHCxg5H5PtqW", title: "Top Bollywood" },
    { id: "romance", title: "Romance" },
    { id: "0JQ5DAqbMKFzHmL4tf05da", title: "Mood" },
    { id: "0JQ5DAqbMKFCWjUTdzaG0e", title: "Indie Playlists" },
    { id: "0JQ5DAqbMKFCfObibaOZbv", title: "Gaming Mode" },
    { id: "0JQ5DAqbMKFKSopHMaeIeI", title: "Punjabi Playlists" },
    { id: "0JQ5DAqbMKFAXlCG6QvYQ4", title: "Workout" },
  ];
  return (
    <>
      <TrendingAlbums />
      <TopSongs />
      <RecentlyPlayed />
      <FeaturedPlaylists />
      {playlistCategories.map((playlistCategory) => (
        <PlaylistCarousel
          key={uuidv4()}
          id={playlistCategory.id}
          title={playlistCategory.title}
        />
      ))}
      <FeaturedArtists />
    </>
  );
};

export default Home;
