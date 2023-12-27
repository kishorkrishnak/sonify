import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import NowPlaying from "./components/sections/NowPlaying";
import {
  Album,
  Artist,
  Artists,
  Category,
  Discover,
  Home,
  Songs,
} from "./pages";
import Playlist from "./pages/Playlist";

const AppContext = createContext();

function App() {
  const [playingTrack, setPlayingTrack] = useState(null);
  const [play, setPlay] = useState(false);
  const [token, setToken] = useState("");
  
  useEffect(() => {
    async function getToken() {
      const response = await axios.get("/auth/token");
      const accessToken = response.data.access_token;
      setToken(accessToken);
      localStorage.setItem("token", accessToken);
    }

    getToken();
  }, []);

  const contextValues = {
    playingTrack,
    setPlayingTrack,
    token,
    setToken,
    play,
    setPlay,
    isLoggedIn: token ? true : false,
  };

  return (
    <AppContext.Provider value={contextValues}>
      {token && playingTrack && (
        <NowPlaying accessToken={token} trackUri={playingTrack?.uri} />
      )}

      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/discover" element={<Discover />}></Route>
          <Route path="/artists" element={<Artists />}></Route>
          <Route path="/songs" element={<Songs />}></Route>
          <Route path="/category/:id" element={<Category />}></Route>
          <Route path="/artist/:id" element={<Artist />}></Route>
          <Route path="/album/:id" element={<Album />}></Route>
          <Route path="/playlist/:id" element={<Playlist />}></Route>
        </Routes>
      </Router>
      <Toaster />
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

export default App;
