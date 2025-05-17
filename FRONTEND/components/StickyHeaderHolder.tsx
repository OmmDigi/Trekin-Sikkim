"use client";

import { useCheckScreenWidth } from "@/hooks/useCheckScreenWidth";
import { useScrollChecker } from "@/hooks/useScrollChecker";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

interface IProps extends React.ComponentProps<"header"> {
  children: React.ReactNode;
}
export default function StickyHeaderHolder({ children, ...props }: IProps) {

  const { scrollingDirection, currentPosition } = useScrollChecker();
  const { screenWidth } = useCheckScreenWidth();
  const pathname = usePathname();

  return (
    <header
      {...props}
      className={cn(
        "fixed left-0 right-0",
        scrollingDirection === "DOWN" ? "-top-full" : "top-0",
        "z-[100] transition-all duration-700",
        currentPosition === 0 && pathname === "/" && screenWidth >= 639
          ? "bg-[#1dc08434] backdrop-blur-sm"
          : "bg-accent",
        "!text-white"
      )}
      // className={`fixed left-0 right-0 ${
      //   scrollingDirection === "DOWN" ? "-top-full" : "top-0"
      // } z-[100] transition-all duration-700 ${currentPosition === 0 && pathname === "/" ? "bg-[#1dc08434] backdrop-blur-sm" : "bg-accent"} ${
      //   props.className ?? ""
      // } !text-white`}
    >
      {children}
    </header>
  );
}
