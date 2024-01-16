import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import { notifyLoginRequired } from "../../utils";

const LibraryType = ({ type }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const handleLibraryTypeClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return notifyLoginRequired();
    navigate(`/library${type.path}`);
  };
  return (
    <a
      onClick={handleLibraryTypeClick}
      href={"/library" + type?.path}
      className="flex flex-col w-[100%] items-center justify-center gap-3"
    >
      <div
        style={{ backgroundImage: `url(${type?.imgUrl})` }}
        className={`brightness-75 text-white bg-no-repeat bg-cover bg-center rounded-lg flex items-center justify-center w-[100%] h-[220px]`}
      >
        {" "}
        <p className="z-40 brightness-100">{type.name}</p>
      </div>
    </a>
  );
};

export default LibraryType;
