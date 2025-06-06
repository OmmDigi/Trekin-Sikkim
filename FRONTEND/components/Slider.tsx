"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosStar } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import * as motion from "motion/react-client";

import "swiper/css";
import Button from "./Button";
import { fadeUpVarient } from "@/utils/animations";
import { cn } from "@/lib/utils";
export default function Slider() {
  const swiperRef = useRef<SwiperType>(null);

  const [slidesPerView, setSlidesPerView] = useState(3);

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

  const array = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 639) {
        setSlidesPerView(1);
      }
    }
  }, []);

  return (
    <>
      <Swiper
        className="wrapper cursor-grab"
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
        {array.map((item, index) => (
          <SwiperSlide key={item}>
            <motion.div
              variants={fadeUpVarient(0.05 * index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3 rounded-4xl overflow-hidden"
            >
              <div className="h-auto relative min-h-[200px] flex flex-col gap-3 p-8 justify-between max-sm:p-3 max-sm:gap-1 max-sm:min-h-[11rem]">
                <div className="space-y-3">
                  {/* Stars */}
                  <div className="flex items-center gap-2 text-accent">
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                  </div>
                  {/* Review */}
                  <div className="grow">
                    <p className="text-sm line-clamp-3 text-black">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Id dignissimos veritatis, commodi doloremque illo
                      consequatur esse. Recusandae
                    </p>
                  </div>
                </div>
                {/* Profile */}
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-[50%]"
                    alt="Testimonial Profile Image"
                    src={"/placeholder_image.jpg"}
                    width={36}
                    height={36}
                  />
                  <h2 className="*:block">
                    <span className="text-xs text-primary">Somnath Gupta</span>
                    <span className="text-xs text-gray-400">@gsomnath</span>
                  </h2>
                </div>

                <div className="bg-accent absolute right-0 opacity-60 h-full w-[1px]"></div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controllers */}
      <div className="flex items-center gap-5 justify-center mt-10">
        <Button
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          disabled={sliderPosition === "start"}
          className={cn(
            "!p-0 !size-8 !bg-black !text-secondary",
            sliderPosition === "start"
              ? "opacity-20"
              : "active:scale-75 opacity-100"
          )}
        >
          <IoIosArrowBack size={12} />
        </Button>
        <Button
          disabled={sliderPosition === "end"}
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          className={cn(
            "!p-0 !size-8 !bg-black !text-secondary",
            sliderPosition === "end"
              ? "opacity-20"
              : "active:scale-75 opacity-100"
          )}
        >
          <IoIosArrowBack size={12} className="rotate-180" />
        </Button>
      </div>
    </>
  );
}
