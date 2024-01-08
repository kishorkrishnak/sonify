import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";
import { useAppContext } from "../../App";
import { notifyLoginRequired } from "../../utils";

const PlayButton = ({ song }) => {
  const {
    colorTheme,
    setPlayingTracks,
    playingTrack,
    isLoggedIn,
    setPlay,
    play,
  } = useAppContext();
  const iconColor = colorTheme === "dark" ? "white" : "black";

  const handlePlayPauseClick = () => {
    if (isLoggedIn) {
      setPlayingTracks([song]);
      setPlay(!play);
    } else {
      notifyLoginRequired();
    }
  };

  const iconStyle = {
    color: iconColor,
    className: play && song?.id === playingTrack?.id ? "pauseIcon" : "playIcon",
  };

  return (
    <IconContext.Provider value={iconStyle}>
      {play && song?.id === playingTrack?.id ? (
        <FaPause onClick={handlePlayPauseClick} className="cursor-pointer" />
      ) : (
        <FaPlay onClick={handlePlayPauseClick} className="cursor-pointer" />
      )}
    </IconContext.Provider>
  );
};

export default PlayButton;
