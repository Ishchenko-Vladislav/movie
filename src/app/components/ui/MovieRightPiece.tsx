import { AxiosResponse } from "axios";
import React from "react";

import { MovieItems } from "../../utilit/typesMovie";
import { SortedBy } from "../pages/MoviePage";
import { MovieItem } from "./MovieItem";
import { GenresType } from "./poster/PosterLayout";
type MovieRightPieceProps = {
  sortBy: SortedBy | undefined;
  selectedGenres: GenresType[];
  selectedYears: number[];
  getDiscoverMovie?: (
    sortBy: string,
    year: string,
    genre: string,
    page: string
  ) => Promise<AxiosResponse<any, any>>;
  getDiscoverTV?: (
    sortBy: string,
    year: string,
    genre: string,
    page: string
  ) => Promise<AxiosResponse<any, any>>;
  movie?: MovieItems[];
  genres: GenresType[];
  where: "tv" | "movie";
};
export const MovieRightPiece: React.FC<MovieRightPieceProps> = ({
  sortBy,
  selectedGenres,
  selectedYears,
  movie,
  genres,
  getDiscoverMovie,
  where,
}) => {
  return (
    <div>
      <div>{}</div>
      <div className="flex flex-wrap">
        {movie?.length != 0 ? (
          movie?.map((item) => (
            <MovieItem
              where={where}
              genres={genres}
              key={item.id}
              item={item}
            />
          ))
        ) : (
          <div className="text-white text-lg text-center">Not Found</div>
        )}
      </div>
    </div>
  );
};
