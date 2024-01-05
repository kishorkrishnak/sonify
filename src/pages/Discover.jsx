import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../App";
import PageLayout from "../components/layout/PageLayout";
import { Loader } from "../components/misc";
import { apiRequest } from "../utils/api";

const Discover = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { loadingRef } = useAppContext();
  useEffect(() => {
    const fetchCategories = async () => {
      loadingRef.current?.continuousStart();

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
        loadingRef.current?.complete();

        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <PageLayout>
      <h1 className="text-black dark:text-white text-3xl ml-6 font-bold">
        Categories
      </h1>
      <div className="grid grid-cols-2 justify-items-center pt-5 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-10">
        {categories.map((category) => (
          <Link
            key={uuidv4()}
            to={"/category/" + category.id}
            state={{ title: category.name }}
            className="flex flex-col grow w-[100%] items-center justify-center gap-3"
          >
            <div
              style={{ backgroundImage: `url(${category.icons[0].url})` }}
              className={`bg-no-repeat bg-cover bg-center rounded-lg flex items-center justify-center w-[100%] h-[170px]`}
            ></div>
            <p className="text-black dark:text-white text-2xl">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
};

export default Discover;
