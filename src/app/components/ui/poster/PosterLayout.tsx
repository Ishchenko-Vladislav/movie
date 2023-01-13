import React, { useEffect, useRef, useState } from "react";
import { useMovieDb } from "../../../hooks/useMovieDb";
import { TopRatedMovie } from "../../../utilit/typesMovie";
import { PosterItem } from "./PosterItem";
import "./style.css";
type PosterLayoutProps = {
  topRatedMovie: TopRatedMovie[];
  title: string;
  where: string;
};
export type GenresType = {
  id: number;
  name: string;
};
export const PosterLayout: React.FC<PosterLayoutProps> = ({
  topRatedMovie,
  title,
  where,
}) => {
  const [genres, setGenres] = useState<GenresType[]>([]);
  const { getGenresMovie } = useMovieDb();
  const genresHandler = async () => {
    const f1 = await getGenresMovie();
    setGenres(f1.data.genres);
  };
  useEffect(() => {
    genresHandler();
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const rightMove = () => {
    if (ref.current) {
      ref.current.scrollLeft += ref.current.offsetWidth;
    }
  };
  const leftMove = () => {
    if (ref.current) {
      ref.current.scrollLeft -= ref.current.offsetWidth;
    }
  };
  return (
    <>
      <div className="flex justify-between items-center  mt-3">
        <div className="text-white text-xl ml-5 cursor-pointer">{title}</div>
        <div className="flex mr-8">
          <div
            onClick={leftMove}
            style={{ borderWidth: 1 }}
            className="flex justify-center items-center w-8 h-8 text-white select-none cursor-pointer hover:text-red-500"
          >
            {"<"}
          </div>
          <div
            onClick={rightMove}
            style={{ borderWidth: 1 }}
            className=" flex justify-center items-center w-8 h-8 text-white select-none cursor-pointer hover:text-red-500"
          >
            {">"}
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden  mt-4 w-full">
        <div
          ref={ref}
          className="no-scroll-bar flex flex-row w-full duration-150 scroll-smooth snap-mandatory snap-x overflow-x-scroll"
        >
          {topRatedMovie?.map((item) => (
            <PosterItem
              where={where}
              genres={genres}
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </>
  );
};
