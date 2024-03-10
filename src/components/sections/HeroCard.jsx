import React from "react";
import { Link } from "react-router-dom";

const HeroCard = ({ category }) => {
  return (
    <div
      className="relative w-full flex items-center justify-center cursor-pointer bg-cover bg-center rounded-lg h-[300px] md:h-[350px]"
      style={{
        backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ),url(${category.cover})`,
      }}
    >
      <div className="flex flex-col gap-3 justify-center items-start absolute left-10 top-10 ">
        <p className="text-white font-bold text-3xl sm:text-4xl">
          {category?.name}
        </p>
        <p className="text-white text-md w-[60%]">{category?.intro}</p>
        <Link
          to={`/category/${category?.path}`}
          state={{ title: category?.name }}
          className="border border-white text-white bg-black py-1 px-3 rounded-md"
        >
          Listen
        </Link>
      </div>
    </div>
  );
};

export default HeroCard;
