import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";
import { useAppContext } from "../../App";
import { notifyLoginRequired } from "../../utils";

const PlayButton = ({ song }) => {
  const {
    colorTheme,
    setPlayingTracks,
    currentTrackId,
    isLoggedIn,
    setPlay,
    play,
  } = useAppContext();
  const iconColor = colorTheme === "dark" ? "white" : "black";
  const isTrackPlaying = play && song?.id === currentTrackId;
  const handlePlayClick = () => {
    if (isLoggedIn) {
      setPlayingTracks([song]);
      setPlay(true);
    } else {
      notifyLoginRequired();
    }
  };

  const handlePauseClick = () => {
    if (isLoggedIn) setPlay(false);
  };

  const iconStyle = {
    color: iconColor,
    className: isTrackPlaying ? "pauseIcon" : "playIcon",
  };

  return (
    <IconContext.Provider value={iconStyle}>
      {isTrackPlaying ? (
        <FaPause onClick={handlePauseClick} className="cursor-pointer" />
      ) : (
        <FaPlay onClick={handlePlayClick} className="cursor-pointer" />
      )}
    </IconContext.Provider>
  );
};

export default PlayButton;
