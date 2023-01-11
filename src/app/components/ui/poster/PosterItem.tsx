import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMovieDb } from "../../../hooks/useMovieDb";
import { TopRatedMovie, TopRatedTv } from "../../../utilit/typesMovie";
import { AvarageVote } from "./AvarageVote";
import { GenresType } from "./PosterLayout";
type PosterItemProps = {
  item: TopRatedMovie;
  genres: GenresType[];
};
export const PosterItem: React.FC<PosterItemProps> = ({ item, genres }) => {
  const [s, setS] = useState("");
  const [isShowInfo, setIsShowInfo] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const httpImage = "https://image.tmdb.org/t/p/w780/";
  const playImage =
    "https://w7.pngwing.com/pngs/261/757/png-transparent-computer-icons-google-play-music-button-play-angle-rectangle-triangle-thumbnail.png";
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
    navigate(`/movie/${item.id}`);
  };
  // const genreName = genres.filter((el) => el.id == item.genre_ids[0]);
  // console.log(item.genre_ids);
  return (
    <div
      onClick={click}
      onMouseEnter={hoverInfo}
      onMouseLeave={() => setIsShowInfo(false)}
      className="shrink-0 w-1/4 sm:w-1/5 flex px-4 snap-start transition-all flex-col relative"
    >
      <div className="min-w-full relative">
        <AvarageVote vote={item.vote_average} />
        <img
          className="max-w-full h-full min-w-full"
          src={`${httpImage}${item.poster_path}`}
          alt=""
        />
        {isShowInfo && (
          <div className="absolute right-0 top-0 bottom-0 left-0 bg-[rgba(0,0,0,0.8)] cursor-pointer">
            {/* <img className="" src={playImage} alt="play" /> */}
          </div>
        )}
      </div>
      <div className="text-white">{name}</div>
      <div className="text-white flex text-xs">
        <div>{s}</div>
        <div className="ml-2">
          {/* {genreName.map((it) => (
            <div key={it.id}>{it.name}</div>
          ))} */}
          {genreName[0]?.name}
        </div>
      </div>
    </div>
  );
};
