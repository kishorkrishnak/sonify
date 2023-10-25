import { Link } from "react-router-dom";
import Song from "./Song";
import axios from "axios";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Pop } from "../assets/images";
const TopSongs = () => {
  const [topSongs, setTopSongs] = useState(null);
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/token");
        const accessToken = data;

        const songsResponse = await axios.get(
          "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(songsResponse);
        setTopSongs(songsResponse.data.tracks.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
      }
    };
    fetchAccessToken();
  }, []);

  return (
    <div className="popular flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between px-3 sm:px-6">
      <div className="w-[100%] lg:w-[48%] flex flex-col items-start justify-start gap-8">
        <p className="text-3xl text-black dark:text-white font-bold">Popular</p>
        <Link
          to={"/category/pop"}
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(pop.jpg)",
          }}
          className="cursor-pointer hover:backdrop-blur flex items-center justify-center rounded-lg min-h-[300px] h-[100%] w-[100%]"
        >
          <p className="text-white font-bold text-5xl">Pop</p>
        </Link>
      </div>
      <div className="w-[100%] lg:w-[48%] flex flex-col items-start justify-start gap-8">
        <p className="text-3xl text-black dark:text-white font-bold ">
          Top Songs
        </p>
        <div className="relative flex flex-col h-[100%] gap-1 w-[100%] mx-auto justify-start items-center">
          {topSongs ? (
            topSongs.slice(0, 6).map((song) => <Song song={song}></Song>)
          ) : (
            <MoonLoader
              color={"greenyellow"}
              loading={true}
              cssOverride={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                margin: "auto",
                borderColor: "red",
              }}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSongs;
