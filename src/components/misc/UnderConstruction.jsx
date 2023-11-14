import { Worker } from "../../assets/images";
const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <img height={120} width={120} src={Worker} alt="worker" />
      <h1 className="text-4xl font-semibold text-[yellow]">
        Under Construction
      </h1>
      <p className="text-white text-md">We're currently working on this page</p>
      <a
        href="/"
        className="bg-yellow-400 text-md text-regular font-inherit px-4 py-2 rounded-lg"
      >
        GO HOME
      </a>
    </div>
  );
};

export default UnderConstruction;
