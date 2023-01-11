import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Header, MovieItems } from "../ui/Header";
export const SearchMovie = () => {
  let location = useLocation();
  const [arrayMovie, setArrayMovie] = useState<MovieItems[]>([]);

  const http = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "&api_key=09d8581da552b52c37833a87dbe776a9";

  useEffect(() => {
    // console.log(location.search);
    const { search } = location;
    // if (search.length == 0) return;
    const httpQuery = `${http}${search}${API_KEY}`;
    axios({
      method: "get",
      url: httpQuery,
    })
      //   .then((res) => {
      //     return new Set(res.data.results) as any;
      //   })
      .then((res) => setArrayMovie(res.data.results));
    return () => {};
  }, []);

  return (
    <Layout>
      <Header />
      <div>
        hello
        <div>
          {arrayMovie.map((item) => (
            <div>{item.title}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
