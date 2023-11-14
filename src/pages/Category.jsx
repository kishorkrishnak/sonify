import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const Category = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/token"); // Change URL if hosted differently
        const accessToken = data;
        const categoryResponse = await axios.get(
          `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
     
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchAccessToken();
  }, []);
  return (
    <PageLayout>
      <h1 className="text-white text-3xl ml-6 font-bold">Categories</h1>

      <div className="p-6 flex flex-wrap gap-24"></div>
    </PageLayout>
  );
};

export default Category;
