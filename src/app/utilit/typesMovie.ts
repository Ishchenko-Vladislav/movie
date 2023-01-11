import { GenresType } from "../components/ui/poster/PosterLayout";

export type MovieItems = {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  total_results?: number;
  name: string;
  first_air_date?: string;

  total_pages?: number;
};
export type TVItems = {
  poster_path: string | null;
  overview: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  title: string;
  release_date: string;

  original_country: [];
  original_language: string;
  original_name: string;
  name: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
};
export type TVMovieItems = {
  adult?: boolean;
  poster_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  original_country: [];
  original_language: string;
  original_name?: string;
  original_title?: string;
  name?: string;
  title?: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
};

export type TopRatedMovie = {
  adult?: boolean; //
  backdrop_path: string | null; //
  id: number; //
  genre_ids: [];
  original_language: string; //
  original_title: string; //
  overview: string; //
  popularity: number; //
  poster_path: string | null; //
  release_date?: string; //
  first_air_date?: string; //
  title: string; //
  name: string;
  video: boolean; //
  vote_average: number; //
  vote_count: number; //
};
export type TopRatedTv = {
  backdrop_path: string | null; //
  id: number; //
  genre_ids: [];
  original_language: string; //
  original_title: string; //
  overview: string; //
  popularity: number; //
  poster_path: string | null; //
  first_air_date?: string; //
  name: string; //
  video: boolean; //
  vote_average: number; //
  vote_count: number; //
};

export type MovieById = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {};
  budget: number;
  genres: GenresType[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [];
  production_countries: [{ iso_3166_1: string; name: string }];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: s;
  vote_average: number;
  vote_count: boolean;
};
type s = {
  results: sR[];
};

export type sR = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type TVById = {
  adult: boolean;
  backdrop_path: string;
  created_by: [];
  episode_run_time: [];
  first_air_date: string;
  genres: [{ id: number; name: string }];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: any;
    season_number: number;
    show_id: number;
    still_path: any;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  networks: [];
  next_episode_to_air: [];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overvie: string;
  popularity: number;
  poster_path: string;
  production_companies: [];
  production_countries: [{ iso_3166_1: string; name: string }];
  seasons: [];
  spoken_languages: [];
  status: string;
  tagline: string;
  type: string;
  videos: s;
  vote_average: number;
  vote_count: number;
};

export type CreditsType = {
  crew: [
    {
      adult: boolean;
      credit_id: string;
      department: string;
      gender: number;
      id: number;
      job: string;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: string;
      profile_path: string;
    }
  ];
  cast: [
    {
      adult: boolean;
      character: string;
      credit_id: string;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      order: number;
      original_name: string;
      popularity: number;
      profile_path: string;
    }
  ];
};
