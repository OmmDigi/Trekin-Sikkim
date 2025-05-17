import { useState } from 'react';

export const useCheckScreenWidth = () => {
  const [screenWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      return width;
    }

    return -1; // fallback for SSR
  });

  return { screenWidth };
};
