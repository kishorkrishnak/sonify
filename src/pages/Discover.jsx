import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { Loader } from "../components/misc";
import { apiRequest } from "../utils/api";
const Discover = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categories = await apiRequest({
          url: "/browse/categories",
        });

        setCategories(categories.categories.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <PageLayout>
      {loading && <Loader size={80}></Loader>}
      <h1 className="text-white text-3xl ml-6 font-bold">Categories</h1>

      <div className="p-6 flex flex-wrap gap-x-24 gap-y-10 w">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={"/category/" + category.id}
            className="flex flex-col items-center justify-center gap-3 w-[100%] md:w-fit"
          >
            <div
              style={{ backgroundImage: `url(${category.icons[0].url})` }}
              className={`bg-no-repeat bg-cover bg-center rounded-lg flex items-center justify-center w-[100%] md:w-[320px] h-[200px]`}
            ></div>
            <p className="text-2xl text-white">{category.name}</p>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
};

export default Discover;