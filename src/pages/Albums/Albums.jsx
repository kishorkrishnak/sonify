import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import { Album } from "../../components/cards";
import { apiRequest } from "../../services";

const ArtistAlbums = () => {
  const { id } = useParams();
  const [albums, setAlbums] = useState(null);

  const { loadingRef } = useAppContext();
  const fetchAlbums = async () => {
    loadingRef.current?.continuousStart();
    const url =
      id === "latest" ? "/browse/new-releases" : `/artists/${id}/albums`;
    try {
      const albums = await apiRequest({
        url,
      });
      console.log(albums);
      setAlbums(albums?.items || albums?.albums?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <>
      <h1 className="text-white text-2xl ml-6 font-bold">Albums</h1>
      <div className="grid grid-cols-2 justify-items-center pt-5 px-3 sm:px-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 gap-y-10">
        {albums &&
          albums.map((album) => <Album album={album} key={uuidv4()} />)}
      </div>
    </>
  );
};

export default ArtistAlbums;
