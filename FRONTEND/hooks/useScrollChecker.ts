import { useEffect, useState } from "react";

type ScrollingDirectionType = "UP" | "DOWN" | null;

export const useScrollChecker = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollingDirection, setScrollingDirection] =
    useState<ScrollingDirectionType>(null);

  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    let lastScrollTop = 0;

    if (typeof window !== "undefined") {
      window.addEventListener(
        "scroll",
        () => {
          const scrollTop =
            window.scrollY || document.documentElement.scrollTop;
          const currentScrollPosition = window.scrollY || 0;

          setCurrentPosition(currentScrollPosition);

          if (currentScrollPosition > 0) {
            setIsScrolling(true);
          } else {
            setIsScrolling(false);
          }

          if (scrollTop > lastScrollTop) {
            // Scrolling down
            // console.log("Scrolling down");
            setScrollingDirection("DOWN");
          } else {
            // Scrolling up
            // console.log("Scrolling up");
            setScrollingDirection("UP");
          }

          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        },
        false
      );
    }
  }, []);

  return { isScrolling, scrollingDirection, currentPosition };
};
