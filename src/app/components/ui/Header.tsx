import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "../../assets/searchIcon.svg";
import { useMovieDb } from "../../hooks/useMovieDb";
import { TVMovieItems } from "../../utilit/typesMovie";
import { HeaderModal } from "./HeaderModal";
import { SimpleModal } from "./SimpleModal";

export const Header = () => {
  const [text, setText] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isShowMovieModal, setIsShowMovieModal] = useState(false);
  const [isShowTVModal, setIsShowTVModal] = useState(false);
  const [arrayItems, setArrayItems] = useState<TVMovieItems[]>([]);
  const [mobileInput, setMobileInput] = useState(false);
  const { getMovieByKeyword, getTVByKeyword } = useMovieDb();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const handler = async () => {
    const ff = await getMovieByKeyword(text);
    const ff2 = await getTVByKeyword(text);
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
  };
  useEffect(() => {
    if (ref.current) {
      if (ref.current.clientWidth < 500) {
        // console.log(ref.current.clientWidth);
        setMobileInput(true);
      } else {
        setMobileInput(false);
      }
    }
  }, []);

  return (
    <header
      ref={ref}
      className="flex justify-between items-center relative w-full"
    >
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
          <div className="text-xl text-[#63ddd7] ml-2 hidden sm:block">
            Kino
          </div>
        </div>
        <div className="flex text-white items-center">
          <div className="text-xs sm:text-xl mx-5">
            <Link to={"/movie"}>Movie</Link>
            {isShowMovieModal ? <SimpleModal /> : ""}
          </div>
          <div className="text-xs sm:text-xl mx-5">
            <Link to={"/tv"} className="z-50 relative cursor-pointer">
              TV
            </Link>
            {isShowTVModal ? <SimpleModal /> : ""}
          </div>
        </div>
      </div>
      {mobileInput ? (
        <form
          onSubmit={searchHandler}
          className="flex justify-center items-center"
        >
          <input
            type={"text"}
            onChange={(e) => setText(e.target.value)}
            placeholder=""
            className="outline-none border-none h-[30px] w-[200px] peer empty:w-[30px] rounded-full focus:w-[200px] focus:px-3 peer transition-all text-white focus:text-black"
          />
          <img
            className="w-[10px] select-none absolute pointer-events-none peer-focus:right-3 peer-valid:right-3"
            src={SearchIcon}
            alt="SearchIcon"
          />
        </form>
      ) : (
        <form
          onSubmit={searchHandler}
          className="px-3 py-1 bg-gray-300 flex rounded-lg"
          // className="px-3 py-1 bg-gray-300 flex sm:rounded-lg rounded-full w-[30px] h-[30px] sm:w-[200px] "
        >
          <input
            type={"text"}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter name movie"
            className="outline-none border-none bg-transparent text-black"
            // className="outline-none border-none bg-transparent bg-gray-300 w-[30px] h-[30px] sm:w-[200px] text-black placeholder-shown:hidden sm:placeholder-shown:block"
          />
          <img
            className="cursor-pointer w-[10px] sm:w-[20px] select-none "
            src={SearchIcon}
            alt=""
          />
        </form>
      )}
      {isShow && <HeaderModal setIsShow={setIsShow} arrayItems={arrayItems} />}
    </header>
  );
};
