import { useRef } from "react";
import Carousel from "react-elastic-carousel";
import HeroCard from "./HeroCard";
import { EDM, Pop, Gaming } from "../../assets/images";

const Hero = () => {
  const categories = [
    {
      name: "EDM",
      path: "0JQ5DAqbMKFHOzuVTgTizF",
      cover: EDM,
      intro:
        "Electrify your playlist with EDM, a realm where pulsating rhythms and euphoric drops reign supreme.",
    },
    {
      name: "Pop",
      path: "pop",
      cover: Pop,
      intro:
        "Step into the world of Pop, where every note is a chart-topping sensation, and join us on a journey through the latest and greatest hits that define the heartbeat of popular music.",
    },
    {
      name: "Gaming",
      path: "0JQ5DAqbMKFCfObibaOZbv",
      cover: Gaming,
      intro:
        "Embark on a melodic quest with our Gaming selection, where adrenaline-pumping beats and epic soundscapes create the ultimate companion for your virtual odyssey.",
    },
  ];
  const carouselRef = useRef(null);
  let resetTimeout;

  return (
    <>
      {true && (
        <Carousel
          className="md:px-3"
          enableAutoPlay={true}
          ref={carouselRef}
          showArrows={false}
          autoPlaySpeed={4000}
          onNextEnd={() => {
            clearTimeout(resetTimeout);
            resetTimeout = setTimeout(() => {
              carouselRef?.current?.goTo(0);
            }, 4000);
          }}
        >
          {categories.map((category) => (
            <HeroCard category={category} />
          ))}
        </Carousel>
      )}
    </>
  );
};
export default Hero;
