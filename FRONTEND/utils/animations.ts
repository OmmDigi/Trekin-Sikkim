import { Variants } from "motion/react";

export const fadeUpVarient = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      bounce: 0,
    },
  },
});

export const fadeDownVarient = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
    y: -20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      bounce: 0,
    },
  },
});

export const parentVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
    },
  },
};

export const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};