import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import PageLayout from "../../components/PageLayout/PageLayout";
import { apiRequest } from "../../services";

const Discover = () => {
  const [categories, setCategories] = useState([]);
  const { loadingRef } = useAppContext();

  useEffect(() => {
    const fetchCategories = async () => {
      loadingRef.current?.continuousStart();
      try {
        const categories = await apiRequest({
          url: "/browse/categories",
        });
        console.log(categories)
        setCategories(categories.categories.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        loadingRef.current?.complete();
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <h1 className="text-black dark:text-white text-2xl ml-6 font-bold">
        Categories
      </h1>
      <div className="grid grid-cols-2 justify-items-center pt-5 px-3 sm:px-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-10">
        {categories.map((category) => (
          <Link
            key={uuidv4()}
            to={"/category/" + category.name}
            state={{ title: category.name }}
            className="flex flex-col grow w-[100%] items-center justify-center gap-3"
          >
            <div
              style={{ backgroundImage: `url(${category.icons[0].url})` }}
              className={`bg-no-repeat bg-cover bg-center rounded-lg flex items-center justify-center w-[100%] h-[170px] md:h-[240px]`}
            ></div>
            <p className="text-black dark:text-white text-md md:text-xl">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Discover;
