import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const MyCarousel = () => {
  const items = [1, 2, 3, 4, 5, 6, 7].map(() => {
    return (
      <div className="bg-red-400 h-[150px] w-[140px]" to={`/coins/`}>
        <h1>XDXD</h1>
      </div>
    );
  });

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 7 },
};

  return (
    <div
    className="px-10"
    >
      <AliceCarousel
           mouseTracking
           items={items}
           responsive={responsive}
           controlsStrategy="alternate"
           disableDotsControls
      />
    </div>
  );
};
export default MyCarousel;
