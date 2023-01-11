import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/searchIcon.svg";
import { MovieItems, TVItems, TVMovieItems } from "../../utilit/typesMovie";
import { bgColor } from "../layout/Layout";
type HeaderModalProps = {
  // arrayMovie: MovieItems[];
  // arrayTV: TVItems[];
  arrayItems: TVMovieItems[];
  setIsShow: Dispatch<SetStateAction<boolean>>;
};
export const HeaderModal: React.FC<HeaderModalProps> = ({
  arrayItems,
  setIsShow,
}) => {
  const navigate = useNavigate();
  const closeHandler = (e: any) => {
    setIsShow(false);
  };
  useEffect(() => {
    window.addEventListener("click", closeHandler);

    return () => {
      window.removeEventListener("click", closeHandler);
    };
  }, []);

  //   const handle = (e: any) => {
  //     e.stopPropagation();
  //   };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute z-50 bg-[#${bgColor}] top-10 right-2 w-[500px] shadow-my p-3`}
    >
      {arrayItems.length != 0 ? (
        arrayItems.map((item) => (
          <div
            onClick={() =>
              navigate(`/${item.title ? "movie" : "tv"}/${item.id}`)
            }
            key={item.id}
            className="truncate  border-b-2 cursor-pointer hover:bg-slate-400 p-1 flex items-center"
          >
            <div>
              <img
                className="cursor-pointer"
                src={SearchIcon}
                width={16}
                alt=""
              />
            </div>
            <div className="ml-3 truncate text-white pr-11">
              {item?.title || item?.name}
            </div>
            <div className="absolute right-5 text-white">
              {item?.title ? "Movie" : "TV"}
            </div>
          </div>
        ))
      ) : (
        <div className="text-white">Not Found</div>
      )}
    </div>
  );
};
