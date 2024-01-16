import { Link } from "react-router-dom";
import { Pop, EDM } from "../../assets/images";
import { useEffect, useState } from "react";

const PopularGenre = () => {
  const genres = [
    { name: "Pop", image: Pop, id: "0JQ5DAqbMKFGvOw3O4nLAf" },
    { name: "EDM", image: EDM, id: "0JQ5DAqbMKFHOzuVTgTizF" },

  ];
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const randomImageNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    const randomGenre = genres[randomImageNumber - 1];
    console.log(randomImageNumber);
    setGenre(randomGenre);
  }, []);
  return (
    <>
      {genre && (
        <div className="w-full lg:w-[48%] flex flex-col gap-5 items-start justify-start">
          <p className="text-2xl font-bold text-black dark:text-white">
            Popular
          </p>
          <Link
            to={`/category/${genre.id}`}
            state={{ title: genre.name }}
            className="w-full h-full flex items-center justify-center cursor-pointer bg-cover bg-center rounded-lg min-h-[300px] sm:min-h-[500px] lg:min-h-[300px]"
            style={{ backgroundImage: `url(${genre.image})` }}
          >
            <p className="text-white font-bold text-5xl">{genre.name}</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default PopularGenre;
