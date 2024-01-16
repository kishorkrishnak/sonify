import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { apiRequest } from "../../services/api";
import { Album } from "../cards";

const LatestAlbums = () => {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const fetchLatestAlbums = async () => {
      try {
        const albums = await apiRequest({
          url: "browse/new-releases",
        });
        setAlbums(albums?.albums?.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchLatestAlbums();
  }, []);
  return (
    <>
      {albums && (
        <div className="pb-7 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-2.5 px-3 sm:px-6 text-2xl text-black dark:text-white font-bold ">
            <span>Latest Albums</span>
            <Link
              className="text-black dark:text-[#B3B3B3] text-xs"
              to={"/view/all"}
            >
              View All
            </Link>
          </div>
          <div className="h-[270px] overflow-hidden px-3 sm:px-6 grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-4">
            {albums?.map((album) => (
              <Album key={uuidv4()} album={album}></Album>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default LatestAlbums;
