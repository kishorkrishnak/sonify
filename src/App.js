import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./App.css";
import { ScrollToTop } from "./components/misc";
import { NowPlaying } from "./components/sections";
import {
  Album,
  Artist,
  Category,
  Discover,
  Home,
  LikedArtists,
  LikedSongs,
  Track,
} from "./pages";
import Playlist from "./pages/Playlist";
import PlaylistBuilder from "./pages/PlaylistBuilder";
import PlaylistBuilderResults from "./pages/PlaylistBuilderResults";
import SpotifyStats from "./pages/SpotifyStats/SpotifyStats";
import TopArtists from "./pages/SpotifyStats/TopArtists";
import TopGenres from "./pages/SpotifyStats/TopGenres";
import TopTracks from "./pages/SpotifyStats/TopTracks";
import UserProfile from "./pages/UserProfile";
import { apiRequest } from "./services";

const AppContext = createContext();

function App() {
  const theme = localStorage.getItem("theme") || "dark";

  const [playingTracks, setPlayingTracks] = useState(null);
  const [play, setPlay] = useState(false);
  const [token, setToken] = useState("");
  const [colorTheme, setColorTheme] = useState(theme);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiRequest({
          url: "/me",
          authFlow: true,
        });
        if (response && response?.type === "user") setProfile(response);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchUserProfile();
  }, []);
  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.get("/auth/token");
        const accessToken = response.data.access_token;
        setToken(accessToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    getToken();
  }, []);

  const loadingRef = useRef(null);

  const contextValues = {
    isLoggedIn: token ? true : false,
    profile,
    playingTracks,
    setPlayingTracks,
    currentTrackId,
    token,
    setToken,
    play,
    setPlay,
    colorTheme,
    setColorTheme,
    loadingRef,
  };

  return (
    <AppContext.Provider value={contextValues}>
      <LoadingBar color="#f11946" ref={loadingRef} />
      <Router>
        {token && playingTracks ? (
          <NowPlaying
            setCurrentTrackId={setCurrentTrackId}
            accessToken={token}
            playingTracks={playingTracks}
          />
        ) : null}

        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<UserProfile />}></Route>
            <Route path="/discover" element={<Discover />}></Route>
            <Route path="/library/artists" element={<LikedArtists />}></Route>
            <Route path="/library/songs" element={<LikedSongs />}></Route>
            <Route path="/category/:id" element={<Category />}></Route>
            <Route path="/artist/:id" element={<Artist />}></Route>
            <Route path="/album/:id" element={<Album />}></Route>
            <Route path="/track/:id" element={<Track />}></Route>
            <Route path="/playlist/:id" element={<Playlist />}></Route>
            <Route path="/stats" element={<SpotifyStats />}></Route>
            <Route path="/stats/toptracks" element={<TopTracks />}></Route>
            <Route path="/stats/topartists" element={<TopArtists />}></Route>
            <Route path="/stats/topgenres" element={<TopGenres />}></Route>
            <Route
              path="/playlistbuilder"
              element={<PlaylistBuilder />}
            ></Route>
            <Route
              path="/playlistbuilder/results"
              element={<PlaylistBuilderResults />}
            ></Route>
          </Routes>
        </ScrollToTop>
      </Router>
      <Toaster
        toastOptions={{
          position: "bottom-center",
          style: {
            padding: "16px",
          },
        }}
      />
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

export default App;
