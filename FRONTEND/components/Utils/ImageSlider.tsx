"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import Button from "../Button";
import Image from "next/image";

import "swiper/css";
import { cn } from "@/lib/utils";

interface IProps {
  images: { url: string; alt_tag: string }[];
  sliderPreview: number;
  className?: string;
  controllerPosition?: "bottom" | "middle" | "top";
  wrapperCss?: string;
  controllerClassName?: string & { className?: never };
}

export default function ImageSlider({
  images,
  sliderPreview,
  className,
  controllerPosition = "middle",
  wrapperCss,
  controllerClassName,
}: IProps) {
  const swiperRef = useRef<SwiperType>(null);

  const [slidesPerView, setSlidesPerView] = useState(sliderPreview);

  const [sliderPosition, setSliderPosition] = useState<
    "start" | "end" | "middle"
  >("start");

  const updateSliderPosition = (swiper: SwiperType) => {
    if (swiper.isBeginning === true) {
      setSliderPosition("start");
    } else if (swiper.isEnd === true) {
      setSliderPosition("end");
    } else {
      setSliderPosition("middle");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 639) {
        setSlidesPerView(1);
      }
    }
  }, []);

  // const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  return (
    <div
      // className={`relative ${wrapperCss ? wrapperCss : ""}`}
      className={cn("relative", wrapperCss)}
    >
      <Swiper
        // className={`wrapper cursor-grab ${className ? className : ""} z-10`}
        className={cn("cursor-grab size-full", className, "z-10")}
        spaceBetween={0}
        slidesPerView={slidesPerView}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateSliderPosition(swiper);
        }}
        onSlideChange={(swiper) => {
          updateSliderPosition(swiper);
        }}
      >
        {images.map((info, index) => (
          <SwiperSlide key={index} className="size-full">
            <Image
              placeholder="blur"
              blurDataURL="/placeholder_background.jpg"
              className="size-full object-cover"
              src={info.url}
              alt={info.alt_tag}
              height={1200}
              width={1200}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div
        className={cn(
          "absolute top-3.5 right-3.5 z-30 flex items-center justify-center"
        )}
      >
        <button
          onClick={() => {
            const elem = imageRefs.current[];
            if (!document.fullscreenElement && elem) {
              elem.requestFullscreen().catch((err) => {
                console.error(
                  `Error trying to enable full-screen mode: ${err.message}`
                );
              });
            } else if (document.fullscreenElement) {
              document.exitFullscreen();
            }
          }}
          className="flex items-center justify-center bg-white cursor-pointer active:scale-90 rounded-full size-10"
        >
          <Maximize size={12} />
        </button>
      </div> */}

      <div
        className={cn(
          "absolute top-0 bottom-0 left-3.5 z-20 flex",
          controllerPosition === "middle"
            ? "items-center"
            : controllerPosition == "top"
            ? "items-start !top-1.5"
            : "items-end !bottom-2.5",
          controllerClassName,
          "justify-center"
        )}
      >
        <Button
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          disabled={sliderPosition === "start"}
          // className={`!p-0 !size-8 !bg-accent !text-white ${
          //   sliderPosition === "start"
          //     ? "opacity-0"
          //     : "active:scale-75 opacity-100"
          // }`}
          className={cn(
            sliderPosition === "start"
              ? "opacity-0"
              : "active:scale-75 opacity-100"
          )}
        >
          <IoIosArrowBack size={12} />
        </Button>
      </div>

      <div
        className={cn(
          "absolute top-0 bottom-0 right-3.5 z-20 flex",
          controllerPosition === "middle"
            ? "items-center"
            : controllerPosition == "top"
            ? "items-start !top-1.5"
            : "items-end !bottom-2.5",
          controllerClassName,
          "justify-center"
        )}
      >
        <Button
          disabled={sliderPosition === "end"}
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          className={cn(
            sliderPosition === "end"
              ? "opacity-0"
              : "active:scale-75 opacity-100"
          )}
          // className={`!p-0 !size-8 !bg-accent !text-white ${
          //   sliderPosition === "end"
          //     ? "opacity-0"
          //     : "active:scale-75 opacity-100"
          // }`}
        >
          <IoIosArrowBack size={12} className="rotate-180" />
        </Button>
      </div>
    </div>
  );
}
