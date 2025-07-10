"use client";

import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  item: {
    itemToRender: {
      id: number;
      content: React.ReactNode;
    }[];
    className?: string;
  };
  itemView?: {
    mobile: number;
    desktop: number;
  };
  className?: string;
  buttons?: {
    next: {
      component: React.ReactNode;
      className?: string;
    };
    prev: {
      component: React.ReactNode;
      className?: string;
    };
  };
}

export default function Carousel({
  item,
  itemView = { desktop: 3, mobile: 1 },
  className = "",
  buttons,
}: IProps) {
  SwiperCore.use([Navigation]);

  const swiperRef = useRef<SwiperClass | null>(null);

  const [sliderPreviewView, setSliderPreviewView] = useState(itemView.desktop);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSliderPreviewView(
        window.innerWidth <= 800 ? itemView.mobile : itemView.desktop
      );
    }
  }, []);

  const goNext = () => {
    swiperRef.current?.slideNext();
  };

  const goBack = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <>
      <Swiper
        slidesPerView={sliderPreviewView}
        centeredSlides={false}
        spaceBetween={40}
        className={className}
        loop = {true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {item.itemToRender.map((eachItem) => (
          <SwiperSlide key={eachItem.id} className={item.className}>
            {eachItem.content}
          </SwiperSlide>
        ))}
      </Swiper>
      {buttons?.prev ? (
        <button onClick={goBack} className={buttons.prev.className}>
          {buttons?.prev.component}
        </button>
      ) : null}

      {buttons?.next ? (
        <button onClick={goNext} className={buttons.next.className}>
          {buttons.next.component}
        </button>
      ) : null}
    </>
  );
}
