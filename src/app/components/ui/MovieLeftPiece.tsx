import React, { Dispatch, SetStateAction, useEffect } from "react";
import { SortedBy } from "../pages/MoviePage";
import { GenresType } from "./poster/PosterLayout";
type MovieLeftPieceProps = {
  setIsShowSort: Dispatch<SetStateAction<boolean>>;
  isShowSort: boolean;
  setIsShowSortBy: Dispatch<SetStateAction<boolean>>;
  isShowSortBy: boolean;
  isShowFilters: boolean;
  sortBy: SortedBy | undefined;
  setIsShowFilters: Dispatch<SetStateAction<boolean>>;
  setSortBy: Dispatch<SetStateAction<SortedBy | undefined>>;
  sortedBy: SortedBy[];
  genres: GenresType[] | undefined;
  setSelectedGenres: Dispatch<SetStateAction<GenresType[]>>;
  setSelectedYears: Dispatch<SetStateAction<number[]>>;
  selectedYears: number[];
  selectedGenres: GenresType[];
  arrayYears: number[];
  isShowBack: boolean;
};
export const MovieLeftPiece: React.FC<MovieLeftPieceProps> = ({
  setIsShowSort,
  isShowSort,
  setIsShowSortBy,
  isShowFilters,
  isShowSortBy,
  sortBy,
  setSortBy,
  sortedBy,
  setIsShowFilters,
  genres,
  setSelectedGenres,
  selectedGenres,
  selectedYears,
  setSelectedYears,
  arrayYears,
  isShowBack,
}) => {
  const selectedGenresHandler = (item: GenresType) => {
    if (!selectedGenres.includes(item)) {
      setSelectedGenres([...selectedGenres, item]);
    } else {
      const deleteItem = selectedGenres.filter((el) => {
        return el.id != item.id;
      });
      setSelectedGenres([...deleteItem]);
    }
  };
  const selectedYearsHandler = (year: number) => {
    if (!selectedYears.includes(year)) {
      setSelectedYears([...selectedYears, year]);
    } else {
      const filtered = selectedYears.filter((el) => {
        return el != year;
      });
      setSelectedYears([...filtered]);
    }
  };
  const scrollTop = (e: any) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-[25%] bg-[#2a2d35] px-3 relative">
      <div className=" w-full shadow-my py-2 px-3 text-white rounded-lg select-none cursor-pointer my-4 hidden sm:block">
        <div
          onClick={() => setIsShowSort(!isShowSort)}
          className={`flex justify-between w-full py-1 border-blue-200 ${
            isShowSort && "border-b-2"
          }`}
        >
          <div>Sort</div>
          <div className={`${isShowSort && "rotate-90"} transition-all`}>
            {">"}
          </div>
        </div>
        {isShowSort && (
          <div>
            <div>Sort Results By</div>
            <div className="relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowSortBy(!isShowSortBy);
                }}
                className="shadow-my px-4 py-2 rounded-lg mt-2 flex justify-between truncate"
              >
                <div>{sortBy?.title}</div>
                <div className="rotate-90">{">"}</div>
              </div>
              {isShowSortBy && (
                <SortModal
                  setSortBy={setSortBy}
                  setIsShowSortBy={setIsShowSortBy}
                  sortedBy={sortedBy}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div
        style={{ minWidth: 100 }}
        className=" w-full shadow-my py-2 px-3 text-white rounded-lg select-none cursor-pointer my-4 relative"
      >
        <div
          onClick={() => setIsShowFilters(!isShowFilters)}
          className={`flex justify-between w-full py-1 border-blue-200  ${
            isShowFilters && "border-b-2"
          }`}
        >
          <div>Filters</div>
          <div className={`${isShowFilters && "rotate-90"} transition-all`}>
            {">"}
          </div>
        </div>
        {isShowFilters && (
          <div
            className={`sm:relative relative w-[90vw] z-50 bg-[#2a2d35] px-4 sm:px-0`}
          >
            <div className="relative flex flex-wrap mt-4 pb-4 border-b-2 ">
              {genres?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => selectedGenresHandler(item)}
                  className={`sm:w-[100%] px-2 lg:w-[50%] cursor-pointer hover:opacity-50
                      ${
                        selectedGenres.includes(item)
                          ? "text-orange-500"
                          : "text-white"
                      }
                      `}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="text-white mt-4 w-full flex flex-wrap">
              {arrayYears.map((item) => (
                <div
                  key={item}
                  onClick={() => selectedYearsHandler(item)}
                  className={`w-[50%] hover:opacity-50 ${
                    selectedYears.includes(item)
                      ? "text-orange-500"
                      : "text-white"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isShowBack && (
        <div
          onClick={scrollTop}
          className="
          fixed 
          text-white
          text-3xl 
          select-none
          cursor-pointer
          p-10
          bottom-[80%]
          flex
          z-50
          w-full
          bg-[rgba(0,0,0,0.2)]
          sm:hover:bg-[rgba(0,0,0,0.2)]
          sm:bg-transparent
          sm:bottom-60
          sm:flex-col
          sm:w-[50px]"
        >
          <div>t</div>
          <div>o</div>
          <div>p</div>
        </div>
      )}
    </div>
  );
};
type SortModalProps = {
  setSortBy: Dispatch<SetStateAction<SortedBy | undefined>>;
  sortedBy: SortedBy[];
  setIsShowSortBy: Dispatch<SetStateAction<boolean>>;
};
const SortModal: React.FC<SortModalProps> = ({
  sortedBy,
  setIsShowSortBy,
  setSortBy,
}) => {
  const handler = () => {
    setIsShowSortBy(false);
  };
  useEffect(() => {
    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);
  const clickHandler = (item: any) => {
    handler();
    setSortBy(item);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bg-[#2a2d34] w-full shadow-my rounded-md px-4 py-2 z-30"
    >
      {sortedBy.map((item) => (
        <div
          key={item.id}
          onClick={() => clickHandler(item)}
          className="py-1 hover:opacity-50"
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
