import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../App";

const SearchResult = ({ data, imageSrc }) => {
  const handleResultClick = () => {
    if (data?.type === "track") return setPlayingTrack(data);
    navigate(`/${data?.type}/${data?.id}`);
  };
  const navigate = useNavigate();
  const { setPlayingTrack } = useAppContext();
  
  return (
    <div
      onClick={handleResultClick}
      className="hover:bg-[#3C3E4D] flex items-center justify-start gap-2 ml-1 cursor-pointer"
    >
      <img
        className="h-[42px] w-[55px] rounded-md"
        src={imageSrc}
        alt={data?.type}
      />
      <p className="text-white">{data?.name}</p>
    </div>
  );
};

export default SearchResult;
