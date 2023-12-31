import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Playlist from "../components/cards/Playlist";
import PageLayout from "../components/layout/PageLayout";
import { apiRequest } from "../utils/api";

const Category = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const title = location?.state?.title;
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await apiRequest({
          url: `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
        });
        setCategory(category?.playlists?.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <PageLayout>
      <h1 className="text-white text-3xl ml-6 font-bold">{title}</h1>
      <div className="pt-5 px-6 flex justify-between flex-wrap gap-y-10 w">
        {category &&
          category.map((playlist, index) => (
            <Playlist playlist={playlist} key={index} />
          ))}
      </div>
    </PageLayout>
  );
};

export default Category;
