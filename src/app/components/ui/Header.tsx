import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "../../assets/searchIcon.svg";
import { useMovieDb } from "../../hooks/useMovieDb";
import { MovieItems, TVItems, TVMovieItems } from "../../utilit/typesMovie";
import { HeaderModal } from "./HeaderModal";
import { SimpleModal } from "./SimpleModal";

export const Header = () => {
  const [text, setText] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isShowMovieModal, setIsShowMovieModal] = useState(false);
  const [isShowTVModal, setIsShowTVModal] = useState(false);
  // const [arrayMovie, setArrayMovie] = useState<MovieItems[]>([]);
  // const [arrayTV, setArrayTV] = useState<TVItems[]>([]);
  const [arrayItems, setArrayItems] = useState<TVMovieItems[]>([]);
  const { getMovieByKeyword, getTVByKeyword } = useMovieDb();
  const navigate = useNavigate();

  const handler = async () => {
    const ff = await getMovieByKeyword(text);
    const ff2 = await getTVByKeyword(text);
    // setArrayMovie(ff.data.results);
    // setArrayTV(ff.data.results);
    setArrayItems([...ff.data.results, ...ff2.data.results]);
  };
  useEffect(() => {
    if (text.length != 0) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [text]);

  useEffect(() => {
    if (text.length == 0) return;
    handler();
  }, [text]);
  const searchHandler = (e: any) => {
    e.preventDefault();
    // navigate(`search?query=${text}`);
  };
  return (
    <header className="flex justify-between items-center relative w-full">
      <div className="flex items-center">
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center"
        >
          <img
            width={40}
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt=""
          />
          <div className="text-xl text-[#63ddd7] ml-2">Kino</div>
        </div>
        <div className="flex text-white items-center">
          <div
            // onMouseEnter={() => setIsShowMovieModal(true)}
            // onMouseLeave={() => setIsShowMovieModal(false)}
            className="text-xl mx-5"
          >
            {/* <div className="z-50 relative cursor-pointer">Movie</div>
             */}
            <Link to={"/movie"}>Movie</Link>
            {isShowMovieModal ? <SimpleModal /> : ""}
            {/* <SimpleModal /> */}
          </div>
          <div
            // onMouseEnter={() => setIsShowTVModal(true)}
            // onMouseLeave={() => setIsShowTVModal(false)}
            className="text-xl mx-5"
          >
            <Link to={"/tv"} className="z-50 relative cursor-pointer">
              TV
            </Link>
            {isShowTVModal ? <SimpleModal /> : ""}
            {/* <SimpleModal /> */}
          </div>
        </div>
      </div>
      <form
        onSubmit={searchHandler}
        className="px-3 py-1 bg-gray-300 flex rounded-lg"
      >
        <input
          type={"text"}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter name movie"
          className="outline-none border-none bg-transparent text-black"
        />
        <img className="cursor-pointer" src={SearchIcon} width={20} alt="" />
      </form>
      {isShow && <HeaderModal setIsShow={setIsShow} arrayItems={arrayItems} />}
    </header>
  );
};
