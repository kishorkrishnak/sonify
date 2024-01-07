import { Audio } from "react-loader-spinner";

const AudioLoader = ({ height, width, radius, wrapperStyle }) => {
  return (
    <Audio
      height={height}
      width={width}
      radius={radius}
      color={"#AFB42B"}
      ariaLabel="loading"
      wrapperStyle={wrapperStyle}
    />
  );
};

export default AudioLoader;
