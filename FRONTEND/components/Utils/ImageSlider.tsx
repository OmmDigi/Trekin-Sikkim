"use client";

import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../Button";
import Image from "next/image";

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
  className,
  controllerPosition = "middle",
  wrapperCss,
  controllerClassName,
}: IProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  // const touchStartX = useRef<number | null>(null);
  // const touchEndX = useRef<number | null>(null);

  const onNextBannerClick = () => {
    setCurrentBannerIndex((prev) => {
      if (prev >= images.length - 1) return 0;
      return prev + 1;
    });
  };

  const onPrevBannerClick = () => {
    setCurrentBannerIndex((prev) => {
      if (prev <= 0) return images.length - 1;
      return prev - 1;
    });
  };

  // const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
  //   touchStartX.current = e.targetTouches[0].clientX;
  // };

  // const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
  //   touchEndX.current = e.targetTouches[0].clientX;
  // };

  // const handleTouchEnd = () => {
  //   if (touchStartX.current === null || touchEndX.current === null) return;

  //   const distance = touchStartX.current - touchEndX.current;
  //   const minSwipeDistance = 50; // Define a minimum distance for a valid swipe

  //   if (distance > minSwipeDistance) {
  //     //swipe left
  //     onNextBannerClick();
  //   } else if (distance < -minSwipeDistance) {
  //     //swipe right
  //     onPrevBannerClick();
  //   }

  //   // Reset touch coordinates
  //   touchStartX.current = null;
  //   touchEndX.current = null;
  // };

  return (
    <div className={cn("relative", wrapperCss)}>
      <ul
        className={cn(
          "cursor-grab size-full",
          className,
          "z-10 !flex items-center"
        )}
      >
        {images.map((info, index) => (
          <li
            style={{ translate: `-${currentBannerIndex * 100}%` }}
            key={index}
            className="size-full flex-grow shrink-0 transition-all duration-300"
          >
            <Image
              placeholder="blur"
              blurDataURL="/placeholder_background.jpg"
              className="size-full object-cover"
              src={info.url}
              alt={info.alt_tag}
              height={1280}
              width={720}
              sizes="(max-width: 768px) 100vw, 700px"
              // loading="eager"
            />
          </li>
        ))}
      </ul>

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
          title="Image Slider Previous Button"
          onClick={onPrevBannerClick}
          disabled={currentBannerIndex === 0}
          className={cn(
            currentBannerIndex === 0
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
          title="Image Slider Next Button"
          disabled={currentBannerIndex === images.length - 1}
          onClick={onNextBannerClick}
          className={cn(
            currentBannerIndex === images.length - 1
              ? "opacity-0"
              : "active:scale-75 opacity-100"
          )}
        >
          <IoIosArrowBack size={12} className="rotate-180" />
        </Button>
      </div>
    </div>
  );
}
