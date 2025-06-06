"use client";

import { useScrollChecker } from "@/hooks/useScrollChecker";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

export default function HeaderHolder({ children }: IProps) {
  const { isScrolling, scrollingDirection, currentPosition } =
    useScrollChecker();

  const pathname = usePathname();

  if (
    pathname.includes("view-file") ||
    pathname.includes("payment-success") ||
    pathname.includes("payment-failed")
  )
    return <></>;

  return (
    <div
      style={{
        translate: `0% ${scrollingDirection === "DOWN" ? "-100%" : "0%"}`,
      }}
      className={cn(
        "w-full",
        currentPosition === 0 ? "sticky" : "fixed",
        "z-50",
        isScrolling ? "bg-[#fff] backdrop-blur-xl" : "bg-transparent",
        pathname === "/" ? "mt-11 sm:mt-[4.5rem]" : "",
        "transition-all duration-500"
      )}
    >
      {children}
    </div>
  );
}
