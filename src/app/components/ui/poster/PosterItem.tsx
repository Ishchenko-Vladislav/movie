import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopRatedMovie, TopRatedTv } from "../../../utilit/typesMovie";
import { AvarageVote } from "./AvarageVote";
import { GenresType } from "./PosterLayout";
type PosterItemProps = {
  item: TopRatedMovie;
  genres: GenresType[];
  where: string;
};
export const PosterItem: React.FC<PosterItemProps> = ({
  item,
  genres,
  where,
}) => {
  const [s, setS] = useState("");
  const [isShowInfo, setIsShowInfo] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const httpImage = "https://image.tmdb.org/t/p/w780/";
  const genreName = genres.filter(
    (el, index) => el.id == item.genre_ids.find((e) => e == el.id)
  );
  const hoverInfo = () => {
    setIsShowInfo(true);
  };
  useEffect(() => {
    if (item.release_date) {
      setS(item.release_date.slice(0, 4));
      setName(item.title);
      return;
    }
    if (item.first_air_date) {
      setS(item.first_air_date.slice(0, 4));
      setName(item.name);

      return;
    }
  }, []);
  const click = () => {
    navigate(`/${where}/${item.id}`);
  };
  return (
    <div
      onClick={click}
      onMouseEnter={hoverInfo}
      onMouseLeave={() => setIsShowInfo(false)}
      className="shrink-0 w-1/2 xs:w-1/4 sm:w-1/5 flex px-4 snap-start transition-all flex-col relative"
    >
      <div className="min-w-full relative">
        <AvarageVote vote={item.vote_average} />
        <img
          className="max-w-full h-full min-w-full"
          src={`${httpImage}${item.poster_path}`}
          alt=""
        />
        {isShowInfo && (
          <div className="absolute right-0 top-0 bottom-0 left-0 bg-[rgba(0,0,0,0.8)] cursor-pointer"></div>
        )}
      </div>
      <div className="text-white text-xs sm:text-lg">{name}</div>
      <div className="text-white flex text-xs">
        <div>{s}</div>
        <div className="ml-2">{genreName[0]?.name}</div>
      </div>
    </div>
  );
};
