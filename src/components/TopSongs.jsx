import Song from "./Song";

const TopSongs = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-0 sm:flex-row justify-between px-2 sm:px-6">
      <div className="w-[100%] sm:w-[48%] flex flex-col items-start justify-start gap-10">
        <p className="text-3xl text-white font-bold">Popular</p>
        <div
          style={{
            backgroundPosition: "center",
            backgroundSize:'cover',
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://pbs.twimg.com/media/EBGYkyNXoAUcaPL?format=jpg&name=4096x4096')",
          }}
          className="flex items-center justify-center rounded-lg min-h-[300px] h-[100%] w-[100%]"
        >
          <p className="text-white font-bold text-5xl">Pop</p>
        </div>
      </div>
      <div className="w-[100%] sm:w-[48%] flex flex-col items-start justify-start gap-10">
        <p className="text-3xl text-white font-bold">Top Songs</p>
        <div className="flex flex-col gap-1 w-[100%] mx-auto justify-start items-center">
          <Song></Song>
          <Song></Song>
          <Song></Song>
          <Song></Song>
          <Song></Song>

          <Song></Song>
        </div>
      </div>
    </div>
  );
};

export default TopSongs;
