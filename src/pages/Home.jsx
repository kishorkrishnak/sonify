import axios from "axios";
import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import TopSongs from "../components/TopSongs";
import MyCarousel from "../components/MyCarousel";
import FeaturedArtists from "../components/FeaturedArtists";
const Home = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/token");
        const accessToken = data;
        console.log(accessToken);
        const albumsResponse = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAlbums(albumsResponse.data.albums.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchAccessToken();
  }, []);

  return (
    <PageLayout>
      <h1 className="text-white text-3xl ml-3 sm:ml-6 font-bold">
        Trending Albums
      </h1>
      {/* <MyCarousel></MyCarousel> */}
      <div className="px-6 py-3 flex flex-wrap gap-24"></div>
      <TopSongs></TopSongs>
      <FeaturedArtists></FeaturedArtists>
    </PageLayout>
  );
};

export default Home;
