import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDb } from "../../hooks/useMovieDb";
import { CreditsType, MovieById, sR, TVById } from "../../utilit/typesMovie";
import { Layout } from "../layout/Layout";
import YouTube from "react-youtube";
import { IntlProvider, FormattedNumber } from "react-intl";
export const DetailsPageTv = ({}) => {
  const API_IMAGES = "https://image.tmdb.org/t/p/w1280";
  const API_IMAGES2 = "https://image.tmdb.org/t/p/w500";

  const { id } = useParams();
  const { getTvCredits, getTvByIdVideo, getMovieList } = useMovieDb();
  const [tv, setTv] = useState<TVById>();
  const [credits, setCredits] = useState<CreditsType>();
  const [isShowVideo, setIsShowVideo] = useState(false);
  //   const [video, setVideo] = useState<any>();
  const asyncHandler = async () => {
    if (id) {
      //   const f1 = await getMovieById(id);
      const f3 = await getTvCredits(+id);
      const f2 = await getTvByIdVideo(id);
      //   console.log(f3);
      setTv(f2.data);
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
    const trailer = tv?.videos.results.find(
      (vid) =>
        vid.name == "Official Trailer" ||
        vid.name == "Official Trailer [Subtitled]" ||
        vid.name == "Dub Trailer"
    );

    //   ||
    //   (tv?.videos.results[0] as sR) ||
    //   null;
    console.log("selected", trailer);
    return (
      <div className="absolute top-10 right-32">
        <YouTube videoId={trailer?.key} />
      </div>
    );
  };
  return (
    <Layout>
      <div className="mt-5">
        <div className="w-full relative">
          {tv?.backdrop_path ? (
            <img
              className="object-cover  w-full h-full"
              //   height={500}
              //   width={}
              src={`${API_IMAGES}${tv?.backdrop_path}`}
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
          {isShowVideo && tv?.videos ? renderTreiler() : null}
        </div>
        <div className="text-white ">
          <div className=" text-4xl">{tv?.name}</div>
          <div className="flex">
            <div className="mr-3">genres:</div>
            <div className="flex">
              {tv?.genres.map((item, index) => (
                <div key={item.id}>
                  {item.name}
                  {tv?.genres.length - 1 == index ? "" : ", "}
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <div className="mr-3">date-release: </div>
            <div>{tv?.first_air_date}</div>
          </div>
          <div className="flex">
            <div className="mr-3">countries: </div>
            {tv?.production_countries.map((item) => (
              <div key={item.iso_3166_1}>
                {item.iso_3166_1}({item.name})
              </div>
            ))}
          </div>
          <div className="flex">
            {/* <div className="mr-3">budget:</div> */}
            {/* <div>{movie?.budget}$</div> */}
            {/* <div>{tv?.budget && <FormattedNumber value={tv?.budget} />}$</div> */}
          </div>
          <div className="flex">
            {/* <div className="mr-3">revenue:</div> */}
            <div className="flex">
              {/* {tv?.revenue && <FormattedNumber value={tv?.revenue} />}$ */}
            </div>
          </div>
          <div className="flex">
            <div className="mr-3">user score:</div>
            <div>{tv?.vote_average}</div>
          </div>
          <div className="flex">
            <div className="mr-3">status:</div>
            <div>{tv?.status}</div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex flex-row px-2">
            {credits?.cast
              .sort((item1, item2) => (item1.profile_path ? -1 : 1))
              .map((item) => (
                <div
                  className="w-1/6 h-[400px]  mr-3 shrink-0 overflow-hidden rounded-xl shadow-my"
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
