import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MovieItems, TVItems } from "../../utilit/typesMovie";
import { AvarageVote } from "./poster/AvarageVote";
import { GenresType } from "./poster/PosterLayout";
type MovieItemProps = {
  item: MovieItems | TVItems;
  genres: GenresType[];
  where: "tv" | "movie";
};
export const MovieItem: React.FC<MovieItemProps> = ({
  item,
  genres,
  where,
}) => {
  const [isShowInfo, setIsShowInfo] = useState(false);
  const httpImage = "https://image.tmdb.org/t/p/w500";
  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  const hoverInfo = () => {
    setIsShowInfo(true);
  };
  const genreName = genres.filter((el, index) => {
    if (item.genre_ids) {
      el.id == item?.genre_ids.find((e) => e == el.id);
    }
  });
  return (
    <Link
      to={`/${where}/${item.id}`}
      onMouseEnter={hoverInfo}
      onMouseLeave={() => setIsShowInfo(false)}
      className="shrink-0 w-1/2 lg:w-1/4 md:w-1/3 px-6 py-3 "
    >
      <div className=" shadow-my  h-[320px]  rounded-lg overflow-hidden relative">
        <div className="relative h-[80%] flex-1  ">
          <AvarageVote vote={item.vote_average} />
          {item.poster_path ? (
            <img
              className="max-w-full h-full min-w-full"
              src={`${httpImage}${item.poster_path}`}
              alt="poster"
            />
          ) : (
            <img
              className="max-w-full h-full min-w-full min-h-full object-cover"
              src={`${noImage}`}
              alt="no-image"
            />
          )}
        </div>
        <div className="text-white px-1 text-sm">{item.title || item.name}</div>

        {isShowInfo && (
          <div className="absolute right-0 top-0 left-0 bottom-0 bg-[rgba(0,0,0,0.8)] cursor-pointer p-2 select-none flex flex-col  items-center">
            <div className="text-white">
              {item.release_date || item.first_air_date}
            </div>
            <div className="text-white">
              {genreName.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
