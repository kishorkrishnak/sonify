import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { Loader } from "../components/misc";
import { apiRequest } from "../utils/api";

const Discover = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categories = await apiRequest({
          url: "/browse/categories",
        });
        console.log(categories);

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
      <div className="grid grid-cols-2 justify-items-center pt-5 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-10">
        {/* <div className="p-6 flex justify-center flex-wrap gap-x-3 md:gap-x-10 gap-y-10 w"> */}
        {categories.map((category, index) => (
          <Link
            key={index}
            to={"/category/" + category.id}
            state={{ title: category.name }}
            className="flex flex-col grow w-[100%] items-center justify-center gap-3"
          >
            <div
              style={{ backgroundImage: `url(${category.icons[0].url})` }}
              className={`bg-no-repeat bg-cover bg-center rounded-lg flex items-center justify-center w-[100%] h-[170px]`}
            ></div>
            <p className="text-2xl text-white">{category.name}</p>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
};

export default Discover;
