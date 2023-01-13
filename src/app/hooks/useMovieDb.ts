import axios from "axios";
import React, { useEffect } from "react";
type URLType = "popular" | "tp";
export const useMovieDb = () => {
  const API_KEY = "?api_key=09d8581da552b52c37833a87dbe776a9";
  const API_IMAGES = "https://image.tmdb.org/t/p/";
  // const http = 'https://api.themoviedb.org/3/keyword/3417?api_key=09d8581da552b52c37833a87dbe776a9'
  // const http = 'https://api.themoviedb.org/3/list/28?api_key=09d8581da552b52c37833a87dbe776a9&language=uk-UA'
  // const http = 'https://api.themoviedb.org/3/movie/503/videos?api_key=09d8581da552b52c37833a87dbe776a9'
  const getMovieByKeyword = async (keyword: string) => {
    const http = `https://api.themoviedb.org/3/search/movie${API_KEY}&query=${keyword}`;
    const results = await getMovie(http);
    return results;
  };
  const getTVByKeyword = async (keyword: string) => {
    const http = `https://api.themoviedb.org/3/search/tv${API_KEY}&query=${keyword}`;
    const results = await getMovie(http);
    return results;
  };
  const getMovieById = async (id: string) => {
    const http = `https://api.themoviedb.org/3/movie/${id}${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getMovieByIdVideo = async (id: string) => {
    const http = `https://api.themoviedb.org/3/movie/${id}${API_KEY}&append_to_response=videos`;
    const results = await getMovie(http);
    return results;
  };
  const getTvByIdVideo = async (id: string) => {
    const http = `https://api.themoviedb.org/3/tv/${id}${API_KEY}&append_to_response=videos`;
    const results = await getMovie(http);
    return results;
  };
  const getMoviePopular = async () => {
    const http = `https://api.themoviedb.org/3/movie/popular${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getMovieByGenres = async (idGenres: number) => {
    const http = `https://api.themoviedb.org/3/discover/movie${API_KEY}&with_genres=${idGenres}`;
    const results = await getMovie(http);
    return results;
  };
  const getGenresMovie = async () => {
    const http = `https://api.themoviedb.org/3/genre/movie/list${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getGenresTV = async () => {
    const http = `https://api.themoviedb.org/3/genre/tv/list${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getMovieTopRated = async () => {
    const http = `https://api.themoviedb.org/3/movie/top_rated${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getMovieUpcomming = async () => {
    const http = `https://api.themoviedb.org/3/movie/upcoming${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getMovieList = async (id: number) => {
    const http = `https://api.themoviedb.org/3/movie/${id}/reviews${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getTvTopRated = async () => {
    const http = `https://api.themoviedb.org/3/tv/top_rated${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getTvCredits = async (id: number) => {
    const http = `https://api.themoviedb.org/3/tv/${id}/credits${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getMovieCredits = async (id: number) => {
    const http = `https://api.themoviedb.org/3/movie/${id}/credits${API_KEY}`;
    const results = await getMovie(http);
    return results;
  };
  const getDiscoverMovie = async (
    sortBy: string,
    year: string,
    genre: string,
    page: string
  ) => {
    const http = `https://api.themoviedb.org/3/discover/movie${API_KEY}${sortBy}${year}${genre}${page}`;
    const results = await getMovie(http);
    return results;
  };
  const getDiscoverTV = async (
    sortBy: string,
    year: string,
    genre: string,
    page: string
  ) => {
    const http = `https://api.themoviedb.org/3/discover/tv${API_KEY}${sortBy}${year}${genre}${page}`;
    const results = await getMovie(http);
    return results;
  };
  const getMovie = async (http: string) => {
    const res = await axios({
      method: "get",
      url: http,
    });
    return res;
  };

  return {
    getMovieByKeyword,
    getMovieById,
    getMoviePopular,
    getMovieByGenres,
    getGenresMovie,
    getGenresTV,
    getMovieTopRated,
    getTvTopRated,
    getMovieUpcomming,
    getMovieList,
    getTVByKeyword,
    getDiscoverMovie,
    getDiscoverTV,
    getMovieByIdVideo,
    getTvByIdVideo,
    getTvCredits,
    getMovieCredits,
  };
};
