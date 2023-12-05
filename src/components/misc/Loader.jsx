import { MoonLoader } from "react-spinners";

const Loader = ({ size }) => {
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
    <MoonLoader
      color={"greenyellow"}
      loading
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
