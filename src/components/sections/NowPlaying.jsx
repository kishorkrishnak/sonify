import { useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useAppContext } from "../../App";

const NowPlaying = ({ accessToken, playingTracks,setCurrentTrackId }) => {

  const getTrackUris = () => {
    if (playingTracks && playingTracks.length > 0) {
      if (playingTracks.length === 1) return [playingTracks[0].uri];
      else {
        console.log(playingTracks);
        let trackUris = playingTracks.map((track) => track.uri);
        return trackUris;
      }
    }

    return [];
  };

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
    if (playingTracks && playingTracks.length > 0) {
      setCurrentTrackId(playingTracks[0].id);
    }
  }, [playingTracks]);

  useEffect(() => {
    setPlay(true);
  }, [playingTracks]);

  if (!accessToken) return null;

  return (
    <div className="fixed bottom-[73px] lg:bottom-0 left-0 right-0 z-40">
      <SpotifyPlayer
        token={accessToken}
        styles={playerStyles}
        callback={(state) => {
          if (state.isPlaying) setPlay(true);
          if (!state.isPlaying && state.isActive) setPlay(false);

          if (state.track) {
            setCurrentTrackId(state.track.id);
          }
        }}
        play={play}
        uris={getTrackUris()}
      />
    </div>
  );
};

export default NowPlaying;
