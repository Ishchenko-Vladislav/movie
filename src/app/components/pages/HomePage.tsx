import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMovieDb } from "../../hooks/useMovieDb";
import { MovieItems, TopRatedMovie } from "../../utilit/typesMovie";
import { Layout } from "../layout/Layout";
import { Carousel } from "../ui/carousel/Carousel";
import { PosterItem } from "../ui/poster/PosterItem";
import { PosterLayout } from "../ui/poster/PosterLayout";

export const HomePage = () => {
  const [popularMovie, setPopularMovie] = useState<MovieItems[]>([]);
  const [topRatedMovie, setTopRatedMovie] = useState<TopRatedMovie[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<TopRatedMovie[]>([]);
  const {
    getMoviePopular,
    getMovieTopRated,
    getTvTopRated,
    getMovieUpcomming,
    getMovieList,
  } = useMovieDb();
  const handler = async () => {
    const f1 = await getMoviePopular();
    const f2 = await getMovieTopRated();
    const f3 = await getTvTopRated();
    // const f4 = await getMovieUpcomming();
    // const f4 = await getMovieList();
    // console.log(f4);
    setTopRatedTv(f3.data.results);
    setTopRatedMovie(f2.data.results);
    setPopularMovie(f1.data.results);
  };
  useEffect(() => {
    handler();

    return () => {};
  }, []);
  const click = async (id: number) => {
    const f4 = await getMovieList(id);
    console.log(f4);
  };
  return (
    <Layout>
      <div className="flex-1 flex flex-col relative">
        <div className="flex flex-1 ">
          <Carousel popularMovie={popularMovie} />
        </div>
        <div>
          <PosterLayout title="Top Rated Movie" topRatedMovie={topRatedMovie} />
          <PosterLayout title="Top Rated TV" topRatedMovie={topRatedTv} />
        </div>
      </div>
    </Layout>
  );
};
