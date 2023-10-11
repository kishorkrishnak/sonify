import { Worker } from "../assets/images";
const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img height={150} width={150} src={Worker} alt="worker" />
      <h1 className="">Under Construction</h1>
    </div>
  );
};

export default UnderConstruction;
