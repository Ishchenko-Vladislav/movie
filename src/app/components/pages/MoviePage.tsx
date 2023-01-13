import React, { useEffect, useState } from "react";
import { useMovieDb } from "../../hooks/useMovieDb";
import { MovieItems } from "../../utilit/typesMovie";
import { Layout } from "../layout/Layout";
import { MovieLeftPiece } from "../ui/MovieLeftPiece";
import { MovieRightPiece } from "../ui/MovieRightPiece";
import { GenresType } from "../ui/poster/PosterLayout";
export type SortedBy = {
  id: number;
  title: string;
  type: string;
};
export const MoviePage = () => {
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isShowBack, setIsShowBack] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [sortBy, setSortBy] = useState<SortedBy | undefined>({
    id: 0,
    title: "Popularity Descending",
    type: "popularity.desc",
  });
  const [isShowSortBy, setIsShowSortBy] = useState<boolean>(false);
  const [isShowSort, setIsShowSort] = useState(true);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<GenresType[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const { getGenresMovie, getDiscoverMovie } = useMovieDb();
  const [movie, setMovie] = useState<MovieItems[]>([]);

  const asyncHandler = async () => {
    const f1 = await getGenresMovie();

    setGenres(f1.data.genres);
  };
  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setIsFetching(true);
    }
    if (e.target.documentElement.scrollTop >= window.innerHeight) {
      setIsShowBack(true);
    }
    if (e.target.documentElement.scrollTop <= window.innerHeight) {
      setIsShowBack(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    asyncHandler();
  }, []);
  useEffect(() => {
    if (isFetching) {
      if (currentPage == totalPages) return;
      settingMovieOther().finally(() => {
        setIsFetching(false);
      });
      setCurrentPage((prev) => prev + 1);
    }
  }, [isFetching]);
  const sortedBy = [
    { id: 0, title: "Popularity Descending", type: "popularity.desc" },
    { id: 1, title: "Popularity Ascending", type: "popularity.asc" },
    { id: 2, title: "Rating Descending", type: "vote_average.desc" },
    { id: 3, title: "Rating Ascending", type: "vote_average.asc" },
    {
      id: 4,
      title: "Release Date Descending",
      type: "primary_release_date.desc",
    },
    {
      id: 5,
      title: "Release Date Ascending",
      type: "primary_release_date.asc",
    },
  ];
  const arrayYears = [2019, 2020, 2021, 2022, 2023];
  const where = "movie";

  const handler = async (page: number = 1) => {
    const sort = `&sort_by=${sortBy?.type || "popularity.desc"}`;
    const year =
      selectedYears.length != 0 ? `&year=${selectedYears.join(",")}` : "";
    const genre =
      selectedGenres.length != 0
        ? `&with_genres=${selectedGenres.map((item) => item.id).join(",")}`
        : "";
    const pageString = `&page=${page}`;
    const f1 = await getDiscoverMovie(sort, year, genre, pageString);
    setTotalPages(f1.data.total_pages);
    return f1.data.results;
  };
  const settingMovie = async () => {
    const data = await handler();
    setMovie(data);
  };
  const settingMovieOther = async () => {
    const data = await handler(currentPage);
    setMovie([...movie, ...data]);
  };
  useEffect(() => {
    settingMovie();
  }, [selectedYears, selectedGenres, sortBy]);
  return (
    <Layout>
      <div className="mt-4 sm:flex">
        <MovieLeftPiece
          isShowBack={isShowBack}
          setSortBy={setSortBy}
          isShowFilters={isShowFilters}
          isShowSort={isShowSort}
          setIsShowSort={setIsShowSort}
          setIsShowSortBy={setIsShowSortBy}
          setIsShowFilters={setIsShowFilters}
          isShowSortBy={isShowSortBy}
          sortBy={sortBy}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          selectedGenres={selectedGenres}
          sortedBy={sortedBy}
          setSelectedYears={setSelectedYears}
          selectedYears={selectedYears}
          arrayYears={arrayYears}
        />
        <div className="w-full sm:w-[75%]">
          <MovieRightPiece
            where={where}
            genres={genres}
            movie={movie}
            getDiscoverMovie={getDiscoverMovie}
            selectedYears={selectedYears}
            selectedGenres={selectedGenres}
            sortBy={sortBy}
          />
        </div>
      </div>
    </Layout>
  );
};
