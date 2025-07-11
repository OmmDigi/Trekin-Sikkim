"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiBookContent } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Button from "./Button";

const banner_info = [
  {
    id: "1",
    title: "Explore the World, One Trail at a Time",
    subtitle:
      "Unforgettable treks, breathtaking tours, and thrilling expeditions tailored just for you.",
    image: "/images/banner_1.jpg",
  },
  {
    id: "2",
    title: "Journey Beyond the Horizon",
    subtitle:
      "Discover curated treks and tours designed to awaken your adventurous spirit.",
    image: "/images/banner_2.jpg",
  },
  {
    id: "3",
    title: "Adventure Awaits — Are You Ready?",
    subtitle:
      "Embark on epic expeditions and immersive tours that create lifelong memories.",
    image: "/images/banner_3.jpg",
  },
];

export default function Banner2() {
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

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      <div className="w-full relative flex overflow-hidden min-h-[33rem] max-h-[33rem] max-sm:min-h-[19rem] max-sm:max-h-[19rem]">
        {banner_info.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{ translate: `-${currentBannerIndex * 100}%` }}
              className="size-full relative transform duration-500  flex-grow shrink-0 min-h-[33rem] max-h-[33rem] max-sm:min-h-[19rem] max-sm:max-h-[19rem]"
            >
              <Image
                className="min-h-[33rem] max-h-[33rem] max-sm:min-h-[19rem] max-sm:max-h-[19rem] w-full object-cover"
                src={item.image}
                alt={item.title}
                height={1280}
                width={620}
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="100vw"
              />

              <div className="absolute inset-0 bg-[#00000094] z-50">
                <div className="max-w-3xl font-montserrat size-full mx-auto flex items-center justify-center flex-col space-y-5 mt-5 max-sm:max-w-[90%] max-sm:mt-0">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-semibold text-white tracking-widest text-center max-sm:text-2xl">
                      {item.title}
                    </h2>
                    <p className="text-center text-sm text-gray-100 tracking-widest max-sm:text-xs">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <Link href="#our-packages-section">
                      {/* <Button className="min-w-[10rem] duration-1000 max-sm:min-[8rem] max-sm:pl-3 !bg-[#1dc085] !text-white !font-semibold">
                      <BiBookContent />
                      Book Now
                    </Button> */}
                      <Button
                        theme="accent"
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2"
                      >
                        <BiBookContent size={16} />
                        <span> Book Now</span>
                      </Button>
                    </Link>

                    {/* <div className=" border-secondary !bg-accent !text-white backdrop-blur-2xl size-10 flex items-center justify-center rounded-[50%] cursor-pointer max-sm:size-8">
                    <IoIosPlay />
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute z-50 top-0 bottom-0 left-0 flex items-center pl-3 max-sm:items-end max-sm:pb-3">
        <button
          title="Click To View Previous Banner Item"
          onClick={onPrevBannerClick}
          className="!bg-[#1dc08470] backdrop-blur-sm !text-white active:scale-90 cursor-pointer rounded-full size-10 flex items-center justify-center max-sm:size-8"
        >
          <GrFormPrevious />
        </button>
      </div>
      <div className="absolute z-50 top-0 bottom-0 right-0 flex items-center pr-3 max-sm:items-end max-sm:pb-3">
        <button
          title="Click To View Next Banner Item"
          onClick={onNextBannerClick}
          className="!bg-[#1dc08470] backdrop-blur-sm !text-white active:scale-90 cursor-pointer rounded-full size-10 flex items-center justify-center max-sm:size-8"
        >
          <GrFormNext />
        </button>
      </div>
    </section>
  );
}
