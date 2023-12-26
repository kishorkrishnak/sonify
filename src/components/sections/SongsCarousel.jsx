import Slider from "react-slick";

const SongsCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 968, // For screens smaller than 768px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1100, // For screens smaller than 768px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1370, // For screens smaller than 1024px
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 2000, // For screens smaller than 1024px
        settings: {
          slidesToShow: 7,
        },
      },
    ],
  };
  return (
    <div className="carousel-container px-7 pb-9 pt-2 flex flex-col justify-center">
      <p className="mb-5 text-3xl text-black dark:text-white font-bold ">
        Trending Albums
      </p>
      {/* <Slider {...settings}>
      {albums?.map((album, index) => (
        <Album key={index} album={album}></Album>
      ))}
    </Slider> */}
    </div>
  );
};

export default SongsCarousel;
