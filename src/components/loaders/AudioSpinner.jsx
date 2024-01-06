import { Audio } from "react-loader-spinner";
import React from "react";

const AudioSpinner = ({ height, width, radius, color, wrapperStyle }) => {
  return (
    <Audio
      height={height}
      width={width}
      radius={radius}
      color={color}
      ariaLabel="loading"
      wrapperStyle={wrapperStyle}
    />
  );
};

export default AudioSpinner;
