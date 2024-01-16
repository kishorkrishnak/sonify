import { MoonLoader as Loader } from "react-spinners";

const MoonLoader = ({ size }) => {
  const override = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    margin: "auto",
    borderColor: "red",
  };
  return (
    <Loader
      color={"greenyellow"}
      loading
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default MoonLoader;
