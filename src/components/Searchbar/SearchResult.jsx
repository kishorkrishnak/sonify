import { useNavigate } from "react-router-dom";
import { NoImage } from "../../assets/images";

const SearchResult = ({ data, imageSrc }) => {
  const handleResultClick = () => {
    navigate(`/${data?.type}/${data?.id}`);
  };
  const navigate = useNavigate();

  return (
    <div
      onClick={handleResultClick}
      className="flex justify-start items-center gap-2 ml-1 hover:bg-[#3C3E4D] hover:text-white  cursor-pointer"
    >
      <img
        className="h-[42px] w-[55px] rounded-md"
        src={imageSrc || NoImage}
        alt={data?.type}
      />
      <p>{data?.name}</p>
    </div>
  );
};

export default SearchResult;
