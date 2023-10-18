import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const Discover = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/token"); // Change URL if hosted differently
        const accessToken = data;
        console.log(accessToken);
        const categoriesResponse = await axios.get(
          "https://api.spotify.com/v1/browse/categories",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(categoriesResponse);
        setCategories(categoriesResponse.data.categories.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchAccessToken();
  }, []);

  return (
    <PageLayout>
      <h1 className="text-white text-3xl ml-6 font-bold">Categories</h1>

      <div className="p-6 flex flex-wrap gap-x-24 gap-y-10 w">
        {categories.map((category, index) => (
          <Link
            to={"/category/" + category.id}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div
              style={{ backgroundImage: `url(${category.icons[0].url})` }}
              className={`bg-red-400 bg-no-repeat bg-cover bg-center rounded-lg flex items-center justify-center w-[320px] h-[200px]`}
            ></div>
            <p className="text-2xl text-white">{category.name}</p>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
};

export default Discover;
