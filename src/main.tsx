import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailsPage } from "./app/components/pages/DetailsPage";
import { ErrorPage } from "./app/components/pages/Error";
import { HomePage } from "./app/components/pages/HomePage";
import { MoviePage } from "./app/components/pages/MoviePage";
import { SearchMovie } from "./app/components/pages/SearchMovie";
import { SearchMoviePage } from "./app/components/pages/SearchMoviePage";
import { TVPage } from "./app/components/pages/TVPage";
import { IntlProvider, FormattedNumber } from "react-intl";
import "./index.css";
import { DetailsPageTv } from "./app/components/pages/DetailsPageTv";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "movie",
    element: <MoviePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "tv",
    element: <TVPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "movie/:id",
    element: <DetailsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "tv/:id",
    element: <DetailsPageTv />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "search",
  //   element: <SearchMoviePage />,
  //   errorElement: <ErrorPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider messages={{}} locale="en" defaultLocale="en">
      <RouterProvider router={router} />
    </IntlProvider>
  </React.StrictMode>
);
