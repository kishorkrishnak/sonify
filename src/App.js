import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/sections/Login";
import Player from "./components/sections/Player";
import {
  Album,
  Artist,
  Artists,
  Category,
  Discover,
  Home,
  Songs,
} from "./pages";

const AppContext = createContext();

function App() {
  const [playingTrack, setPlayingTrack] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {}, [playingTrack]);

  useEffect(() => {
    async function getToken() {
      const response = await axios.get("/auth/token");
      setToken(response.data.access_token);
    }

    getToken();
  }, []);

  const contextValues = {
    playingTrack,
    setPlayingTrack,
    token,
  };

  return (
    <AppContext.Provider value={contextValues}>
      <>
        {token && playingTrack && (
          <Player accessToken={token} trackUri={playingTrack?.uri} />
        )}

        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/discover" element={<Discover />}></Route>
            <Route path="/category/:id" element={<Category />}></Route>
            <Route path="/artist/:id" element={<Artist />}></Route>
            <Route path="/album/:id" element={<Album />}></Route>
            <Route path="/artists" element={<Artists />}></Route>
            <Route path="/songs" element={<Songs />}></Route>
          </Routes>
        </Router>
      </>
    </AppContext.Provider>
  );
}

// Create a custom hook to use the context values
export const useAppContext = () => useContext(AppContext);

export default App;
