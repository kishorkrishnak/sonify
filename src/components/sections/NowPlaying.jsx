import { useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useAppContext } from "../../App";

const NowPlaying = ({ accessToken, playingTrack }) => {
  const { play, setPlay } = useAppContext();
  const playerStyles = {
    activeColor: "#fff",
    bgColor: "#121212",
    color: "#fff",
    loaderColor: "#fff",
    sliderColor: "#1cb954",
    trackArtistColor: "#ccc",
    trackNameColor: "#fff",
  };
  useEffect(() => {
    setPlay(true);
    localStorage.setItem("recentlyPlayedTrack", JSON.stringify(playingTrack));
  }, [playingTrack]);

  if (!accessToken) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <SpotifyPlayer
        token={accessToken}
        styles={playerStyles}
        callback={(state) => {
          if (state.isPlaying) setPlay(true);
          if (!state.isPlaying && state.isActive) setPlay(false);
        }}
        play={play}
        uris={playingTrack?.uri ? [playingTrack?.uri] : []}
      />
    </div>
  );
};

export default NowPlaying;
