import Heart from "react-heart";
import { useAppContext } from "../../App";
import { useEffect, useState } from "react";

const HeartButton = ({ song }) => {
  const [heartActive, setHeartActive] = useState(false);

  const { colorTheme } = useAppContext();
  useEffect(() => {
    const isFavorite = (
      JSON.parse(localStorage.getItem("favoriteSongs")) || []
    ).some((favoriteSong) => favoriteSong.id === song.id);

    if (isFavorite) setHeartActive(true);
  }, [song.id]);

  const iconColor = colorTheme === "dark" ? "white" : "black";
  const handleHeartClick = () => {
    const previousFavorites =
      JSON.parse(localStorage.getItem("favoriteSongs")) || [];

    if (heartActive) {
      const updatedFavorites = previousFavorites.filter(
        (favorite) => favorite.id !== song.id
      );
      localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites));
      setHeartActive(false);
    } else {
      if (song) {
        previousFavorites.push(song);
        localStorage.setItem(
          "favoriteSongs",
          JSON.stringify(previousFavorites)
        );
        setHeartActive(true);
      }
    }
  };

  return (
    <div style={{ width: "2rem" }}>
      <Heart
        animationScale={1.25}
        inactiveColor="white"
        style={{
          height: "17px",
          fill: heartActive ? "red" : iconColor,
          border: "none",
        }}
        isActive={heartActive}
        onClick={handleHeartClick}
      />
    </div>
  );
};

export default HeartButton;
