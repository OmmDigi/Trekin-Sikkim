"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { BiBookContent } from "react-icons/bi";
import { IoIosPlay } from "react-icons/io";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const banner_info = [
  {
    id: "1",
    title:
      "Experience the Thrill of Adventure and the Beauty of Nature on Our Guided Treks",
    image: "/images/banner_1.jpg",
  },
  {
    id: "2",
    title:
      "Experience the Thrill of Adventure and the Beauty of Nature on Our Guided Treks 2",
    image: "/images/banner_2.jpg",
  },
  {
    id: "3",
    title:
      "Experience the Thrill of Adventure and the Beauty of Nature on Our Guided Treks 3",
    image: "/images/banner_3.jpg",
  },
];

function Banner() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onNextBannerClick = () => {
    setCurrentBannerIndex((prev) => {
      if (prev >= banner_info.length - 1) return 0;
      return prev + 1;
    });
  };

  const onPrevBannerClick = () => {
    setCurrentBannerIndex((prev) => {
      if (prev <= 0) return banner_info.length - 1;
      return prev - 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Define a minimum distance for a valid swipe

    if (distance > minSwipeDistance) {
      //swipe left
      onNextBannerClick();
    } else if (distance < -minSwipeDistance) {
      //swipe right
      onPrevBannerClick();
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const timeIntervelId = setInterval(() => {
      onNextBannerClick();
    }, 6000);

    return () => clearInterval(timeIntervelId);
  }, [currentBannerIndex]);

  return (
    <div className="group/banner relative">
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        // className="w-full overflow-hidden relative aspect-[3.17/1] max-sm:aspect-[16/9]"
        className="w-full overflow-hidden relative h-[90vh] max-sm:h-[45vh]"
      >
        {banner_info.map((item, index) => (
          <div
            key={item.id}
            className={`w-full h-full absolute ${
              currentBannerIndex === index
                ? "opacity-100 blur-[0px]"
                : "opacity-0 blur-md"
            } transition-all duration-1000 ease-in-out`}
          >
            <Image
              className="size-full object-cover"
              src={item.image}
              alt="Banner 1"
              height={1200}
              width={1200}
            />
          </div>
        ))}

        {/* <div className="absolute inset-0 bg-[#00000073] z-50">
          <div className="size-full relative flex items-center max-w-[90%] mx-auto">
            {banner_info.map((item, index) => (
              <div key={item.id} className="space-y-4 absolute">
                <h1
                  className={`font-montserrat text-secondary text-heading font-[600] max-w-[35rem] ${
                    currentBannerIndex === index ? "opacity-100" : "opacity-0"
                  } transition-all duration-1000 max-sm:text-lg max-sm:max-w-[20rem] max-sm:leading-7`}
                >
                  {item.title}
                </h1>

                <div className="flex items-center gap-5">
                  <Button
                    className={`min-w-[12rem] ${
                      currentBannerIndex === index ? "opacity-100" : "opacity-0"
                    } transition-all duration-1000 max-sm:min-[8rem] max-sm:pl-3 !bg-accent !text-white`}
                  >
                    <BiBookContent />
                    Book Now
                  </Button>

                  <div className=" border-secondary !bg-accent !text-white backdrop-blur-2xl size-10 flex items-center justify-center rounded-[50%] cursor-pointer max-sm:size-8">
                    <IoIosPlay />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="absolute inset-0 bg-[#00000094] z-50">
          <div className="max-w-3xl font-montserrat size-full mx-auto flex items-center justify-center flex-col space-y-5 mt-5 max-sm:max-w-[90%] max-sm:mt-0">
            <div className="space-y-2">
              <h2 className="text-4xl font-semibold text-white tracking-widest text-center max-sm:text-2xl">
                Experience the Beauty of Nature
              </h2>
              <p className="text-center text-sm text-gray-100 tracking-widest max-sm:text-xs">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <Button
                className={`min-w-[10rem] transition-all duration-1000 max-sm:min-[8rem] max-sm:pl-3 !bg-accent !text-white`}
              >
                <BiBookContent />
                Book Now
              </Button>

              <div className=" border-secondary !bg-accent !text-white backdrop-blur-2xl size-10 flex items-center justify-center rounded-[50%] cursor-pointer max-sm:size-8">
                <IoIosPlay />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute z-50 top-0 bottom-0 left-0 flex items-center pl-3 max-sm:hidden">
          <button
            onClick={onPrevBannerClick}
            className="!bg-accent !text-white active:scale-90 cursor-pointer rounded-full size-10 flex items-center justify-center"
          >
            <GrFormPrevious />
          </button>
        </div>
        <div className="absolute z-50 top-0 bottom-0 right-0 flex items-center pr-3  max-sm:hidden">
          <button
            onClick={onNextBannerClick}
            className="!bg-accent !text-white active:scale-90 cursor-pointer rounded-full size-10 flex items-center justify-center"
          >
            <GrFormNext />
          </button>
        </div>
      </div>
      {/* <HomeFilter /> */}

      {/* <div className="relative mt-5 h-48 hidden max-sm:block">
        {banner_info.map((item, index) => (
          <div key={item.id} className="space-y-4 absolute">
            <h1
              className={`font-montserrat text-primary text-heading font-[600] max-w-[35rem] ${
                currentBannerIndex === index ? "opacity-100" : "opacity-0"
              } transition-all duration-1000 max-sm:text-xs max-sm:max-w-[15rem]`}
            >
              {item.title}
            </h1>

            <div className="flex items-center gap-5">
              <Button
                className={`min-w-[8rem] ${
                  currentBannerIndex === index ? "opacity-100" : "opacity-0"
                } transition-all duration-1000`}
                icon={<BiBookContent />}
              >
                Book Now
              </Button>
              <div className=" border-secondary bg-[#ffffffaf] backdrop-blur-2xl size-10 flex items-center justify-center rounded-[50%] cursor-pointer text-primary">
                <IoIosPlay />
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Banner;
