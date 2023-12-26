import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  try {
    return (
      <div className="px-4 fixed bottom-0 left-0 right-0 z-40">
        <SpotifyPlayer
          token={accessToken}
          styles={{
            activeColor: "#fff",
            bgColor: "#121212",
            color: "#fff",
            
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
        />
      </div>
    );
  } catch (error) {
    // Handle the error as needed
  }
}
