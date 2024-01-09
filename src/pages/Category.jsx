import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../App";
import Playlist from "../components/cards/Playlist";
import PageLayout from "../components/layout/PageLayout";
import { apiRequest } from "../services";

const Category = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const { title, playlists } = location?.state;
  const { loadingRef } = useAppContext();

  const fetchCategory = async () => {
    if (playlists) {
      setCategory(playlists);
      return;
    }
    loadingRef.current?.continuousStart();

    try {
      const category = await apiRequest({
        url: `/browse/categories/${id}/playlists`,
      });
      setCategory(category?.playlists?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <PageLayout>
      <h1 className="text-white text-2xl ml-6 font-bold">{title}</h1>
      <div className="grid grid-cols-2 justify-items-center pt-5 px-3 sm:px-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 gap-y-10">
        {category &&
          category.map((playlist) => (
            <Playlist playlist={playlist} key={uuidv4()} />
          ))}
      </div>
    </PageLayout>
  );
};

export default Category;
