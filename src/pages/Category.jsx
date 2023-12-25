import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { apiRequest } from "../utils/api";

const Category = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await apiRequest({
          url: `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
        });
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <PageLayout>
      <h1 className="text-white text-3xl ml-6 font-bold">Categories</h1>
      <div className="p-6 flex flex-wrap gap-24"></div>
    </PageLayout>
  );
};

export default Category;
