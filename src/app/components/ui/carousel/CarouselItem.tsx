import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovieDb } from "../../../hooks/useMovieDb";
import { MovieItems } from "../../../utilit/typesMovie";
type CarouselItemProps = {
  item: MovieItems;
  slideIndex: number;
  index: number;
};
export const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  slideIndex,
  index,
}) => {
  const navigate = useNavigate();
  const httpImage = "https://image.tmdb.org/t/p/w1280";
  const click = async () => {
    navigate(`/movie/${item.id}`);
  };
  return (
    <div
      onClick={click}
      key={item.backdrop_path}
      className={`w-full h-full absolute  duration-200 justify-center items-center cursor-pointer  ${
        slideIndex == index ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      <img
        className="h-full w-full opacity-70 object-fill"
        src={`${httpImage}${item.backdrop_path}`}
        alt="image"
      />
      <div className="absolute z-20 flex-col hidden sm:flex sm:w-[300px] sm:h-[200px] md:w-[500px] md:h-[400px] top-1/4 left-1/4 origin-center select-none">
        <div className="text-base lg:text-2xl font-black text-white tracking-[0.3em]">
          {item.title}
        </div>
        <div className="text-base lg:text-xl font-bold text-white">
          {item.release_date}
        </div>
        <div className="text-base lg:text-xl font-bold text-white">
          IMDB {item.vote_average}/10
        </div>
        <div className="text-white mt-2 text-xs lg:text-base">
          {item.overview}
        </div>
      </div>
    </div>
  );
};
