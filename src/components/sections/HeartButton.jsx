import React from "react";
import Heart from "react-heart";
import { useAppContext } from "../../App";

const HeartButton = ({ heartActive, handleHeartClick }) => {
  const { colorTheme } = useAppContext();
  const iconColor = colorTheme === "dark" ? "white" : "black";
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
