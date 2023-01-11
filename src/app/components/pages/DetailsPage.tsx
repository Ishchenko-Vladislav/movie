import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDb } from "../../hooks/useMovieDb";
import { CreditsType, MovieById, sR } from "../../utilit/typesMovie";
import { Layout } from "../layout/Layout";
import YouTube from "react-youtube";
import { IntlProvider, FormattedNumber } from "react-intl";
export const DetailsPage = ({}) => {
  const API_IMAGES = "https://image.tmdb.org/t/p/w1280";
  const API_IMAGES2 = "https://image.tmdb.org/t/p/w500";

  const { id } = useParams();
  const { getMovieCredits, getMovieByIdVideo } = useMovieDb();
  const [movie, setMovie] = useState<MovieById>();
  const [credits, setCredits] = useState<CreditsType>();
  const [isShowVideo, setIsShowVideo] = useState(false);
  //   const [video, setVideo] = useState<any>();
  const asyncHandler = async () => {
    if (id) {
      //   const f1 = await getMovieById(id);
      const f2 = await getMovieByIdVideo(id);
      const f3 = await getMovieCredits(+id);
      // console.log(f2);
      setMovie(f2.data);
      setCredits(f3.data);
      //   setVideo(f2);
    }
  };
  useEffect(() => {
    if (id) {
      asyncHandler();
    }
  }, [id]);
  const renderTreiler = () => {
    const trailer =
      movie?.videos.results.find((vid) => vid.name == "Official Trailer") ||
      (movie?.videos.results[0] as sR);
    return (
      <div className="absolute top-0 lg:top-10 right-0 lg:right-32">
        <YouTube
          style={{}}
          className="w-[50%] md:w-full"
          videoId={trailer?.key}
        />
      </div>
    );
  };
  return (
    <Layout>
      <div className="mt-5">
        <div className="w-full relative">
          {movie?.backdrop_path ? (
            <img
              className="object-cover  w-full h-full"
              //   height={500}
              //   width={}
              src={`${API_IMAGES}${movie?.backdrop_path}`}
              alt="backdrop-image"
            />
          ) : (
            <div>not have image</div>
          )}
          <div
            onClick={() => setIsShowVideo(!isShowVideo)}
            style={{ borderWidth: 1, borderColor: "white" }}
            className="absolute bottom-20 left-5 flex justify-center items-center  w-[100px] h-[50px] bg-[rgba(0,0,0,1)] z-50 text-white  select-none cursor-pointer border-white"
          >
            {isShowVideo ? "close" : "Play"}
          </div>
          {isShowVideo && movie?.videos ? renderTreiler() : null}
        </div>
        <div className="text-white ">
          <div className=" text-4xl">{movie?.title}</div>
          <div className="flex">
            <div className="mr-3">genres:</div>
            <div className="flex">
              {movie?.genres.map((item, index) => (
                <div key={item.id}>
                  {item.name}
                  {movie?.genres.length - 1 == index ? "" : ", "}
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <div className="mr-3">date-release: </div>
            <div>{movie?.release_date}</div>
          </div>
          <div className="flex">
            <div className="mr-3">countries: </div>
            {movie?.production_countries.map((item) => (
              <div key={item.iso_3166_1}>
                {item.iso_3166_1}({item.name})
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="mr-3">budget:</div>
            {/* <div>{movie?.budget}$</div> */}
            <div>
              {movie?.budget && <FormattedNumber value={movie?.budget} />}$
            </div>
          </div>
          <div className="flex">
            <div className="mr-3">revenue:</div>
            <div className="flex">
              {movie?.revenue && <FormattedNumber value={movie?.revenue} />}$
            </div>
          </div>
          <div className="flex">
            <div className="mr-3">user score:</div>
            <div>{movie?.vote_average}</div>
          </div>
          <div className="flex">
            <div className="mr-3">status:</div>
            <div>{movie?.status}</div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex flex-row px-2">
            {credits?.cast
              .sort((item1, item2) => (item1.profile_path ? -1 : 1))
              // .sort()
              .map((item) => (
                <div
                  className="w-1/6 h-[200px] sm:h-[200px] md:h-[300px] lg:h-[400px]  mr-3 shrink-0 overflow-hidden rounded-xl shadow-my"
                  key={item.credit_id}
                >
                  <div className="w-full h-[80%] overflow-hidden">
                    {item.profile_path ? (
                      <img src={`${API_IMAGES2}${item.profile_path}`} alt="" />
                    ) : (
                      <div className="text-white w-full h-full flex justify-center items-center">
                        not have image
                      </div>
                    )}
                  </div>
                  <div className="text-white px-1 text-lg">
                    {item.original_name}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
