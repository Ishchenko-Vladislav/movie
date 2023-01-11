import React, { useEffect, useRef, useState } from "react";
import { MovieItems } from "../../../utilit/typesMovie";
import { CarouselItem } from "./CarouselItem";
type CarouselProps = {
  popularMovie: MovieItems[];
};
export const Carousel: React.FC<CarouselProps> = ({ popularMovie }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [state, setState] = useState({ firstTouch: 0, isActive: false });

  const onTouchStart = (e: any) => {
    setState({
      ...state,
      isActive: true,
      firstTouch: e.targetTouches[0].clientX,
    });
  };
  const onTouchEnd = (e: any) => {
    setState({
      ...state,
      isActive: false,
    });
  };
  const onTouchMove = (e: any) => {
    const { firstTouch, isActive } = state;
    if (isActive) {
      if (firstTouch < e.targetTouches[0].clientX) {
        prevSlide();
        setState({
          ...state,
          isActive: false,
        });
      }
      if (firstTouch > e.targetTouches[0].clientX) {
        nextSlide();
        setState({
          ...state,
          isActive: false,
        });
      }
    }
  };
  const prevSlide = () => {
    if (slideIndex == 0) {
      setSlideIndex(popularMovie.length - 1);
    } else {
      setSlideIndex((prev) => prev - 1);
    }
  };
  const nextSlide = () => {
    if (slideIndex == popularMovie.length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex((prev) => prev + 1);
    }
  };
  return (
    <div className="relative w-full mt-5 h-[400px] lg:h-[600px] overflow-hidden bg-black">
      <ArrowButtonLeft prevSlide={prevSlide} />
      <ArrowButtonRight nextSlide={nextSlide} />

      <div
        className="w-full h-full flex"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {popularMovie.map((item, index) => (
          <CarouselItem
            key={item.backdrop_path}
            index={index}
            slideIndex={slideIndex}
            item={item}
          />
        ))}
      </div>
      <div className="absolute bottom-7 flex justify-center items-center w-full z-30">
        {popularMovie.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSlideIndex(index)}
            className={`cursor-pointer w-3 h-3 m-2 rounded-full ${
              slideIndex == index ? "bg-white" : "bg-[rgb(0,0,0,0.5)]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
const ArrowButtonLeft = ({ prevSlide }: any) => {
  return (
    <div
      onClick={prevSlide}
      className={`absolute left-10 h-full flex items-center z-30 select-none`}
    >
      <div className="text-white pb-1 w-[40px] h-[70px] hover:bg-[rgb(0,0,0,0.5)] text-3xl cursor-pointer flex justify-center items-center">
        {"<"}
      </div>
    </div>
  );
};
const ArrowButtonRight = ({ nextSlide }: any) => {
  return (
    <div
      onClick={nextSlide}
      className={`absolute right-10 h-full  flex items-center z-30 select-none`}
    >
      <div className="text-white pb-1 w-[40px] h-[70px] hover:bg-[rgb(0,0,0,0.5)] text-3xl cursor-pointer flex justify-center items-center">
        {">"}
      </div>
    </div>
  );
};
