import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./App.css";
import PageLayout from "./components/PageLayout/PageLayout";
import { ScrollToTop } from "./components/others";
import { NowPlaying } from "./components/sections";
import { Album, Artist, Category, Discover, Home, Track } from "./pages";
import ArtistAlbums from "./pages/Albums/Albums";
import Playlist from "./pages/Playlist/Playlist";
import PlaylistBuilder from "./pages/PlaylistBuilder/PlaylistBuilder";
import PlaylistBuilderResults from "./pages/PlaylistBuilder/PlaylistBuilderResults";
import UserProfile from "./pages/Profile/Profile";
import Related from "./pages/Related/Related";
import RecentlyPlayed from "./pages/SpotifyStats/RecentlyPlayed";
import SpotifyStats from "./pages/SpotifyStats/SpotifyStats";
import TopArtists from "./pages/SpotifyStats/TopArtists";
import TopGenres from "./pages/SpotifyStats/TopGenres";
import TopTracks from "./pages/SpotifyStats/TopTracks";
import { apiRequest } from "./services";

const AppContext = createContext();

function App() {
  const theme = localStorage.getItem("theme") || "dark";

  const [profile, setProfile] = useState(null);
  const [playingTracks, setPlayingTracks] = useState(null);
  const [play, setPlay] = useState(false);
  const [token, setToken] = useState("");
  const [colorTheme, setColorTheme] = useState(theme);
  const [currentTrackId, setCurrentTrackId] = useState(null);

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

  const toastOptions = {
    position: "bottom-center",
    style: {
      padding: "16px",
    },
  };

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

  const getToken = async () => {
    try {
      const response = await axios.get("/auth/token");
      const accessToken = response.data.access_token;
      setToken(accessToken);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  useEffect(() => {
    if (token) fetchUserProfile();
  }, [token]);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AppContext.Provider value={contextValues}>
      <LoadingBar color="#f11946" ref={loadingRef} />
      <BrowserRouter>
        {token && playingTracks ? (
          <NowPlaying
            setCurrentTrackId={setCurrentTrackId}
            accessToken={token}
            playingTracks={playingTracks}
          />
        ) : null}

        <ScrollToTop>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<UserProfile />}></Route>
              <Route path="/discover" element={<Discover />}></Route>

              <Route path="/category/:id" element={<Category />}></Route>
              <Route path="/artist/:id" element={<Artist />}></Route>
              <Route path="/artist/:id/related" element={<Related />}></Route>
              <Route
                path="/artist/:id/albums"
                element={<ArtistAlbums />}
              ></Route>
              <Route path="/albums/:id" element={<ArtistAlbums />}></Route>
              <Route path="/album/:id" element={<Album />}></Route>
              <Route path="/track/:id" element={<Track />}></Route>
              <Route path="/playlist/:id" element={<Playlist />}></Route>
              <Route path="/stats" element={<SpotifyStats />}></Route>
              <Route path="/stats/toptracks" element={<TopTracks />}></Route>
              <Route path="/stats/topartists" element={<TopArtists />}></Route>
              <Route path="/stats/topgenres" element={<TopGenres />}></Route>
              <Route
                path="/stats/recentlyplayed"
                element={<RecentlyPlayed />}
              ></Route>

              <Route
                path="/playlistbuilder"
                element={<PlaylistBuilder />}
              ></Route>
              <Route
                path="/playlistbuilder/results"
                element={<PlaylistBuilderResults />}
              ></Route>
            </Routes>
          </PageLayout>
        </ScrollToTop>
      </BrowserRouter>
      <Toaster toastOptions={toastOptions} />
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

export default App;
