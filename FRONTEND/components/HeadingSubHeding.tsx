import React from "react";
// import * as motion from "motion/react-client";
// import { fadeUpVarient } from "@/utils/animations";
import Link from "next/link";
import { GoArrowDownLeft } from "react-icons/go";
import { cn } from "@/lib/utils";
// import dynamic from "next/dynamic";

interface IProps {
  heading: string;
  subheading?: string;
  headingColor?: string;
  subheadingColor?: string;
  iconColor?: string;
  extraText?: string;
  extraLink?: string;
  wrapperCss?: string;
}

// const Mp = dynamic(() => import("motion/react-client").then(mod => mod.p));
// const Mh2 = dynamic(() => import("motion/react-client").then(mod => mod.h2));

export default function HeadingSubHeding({
  heading,
  subheading,
  extraText,
  extraLink,
  wrapperCss,
}: IProps) {
  return (
    <div className={cn("grid grid-cols-2 max-sm:grid-cols-1", wrapperCss)}>
      <div>
        <h2
          // variants={fadeUpVarient(0.05)}
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true }}
          className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2"
        >
          {heading}
        </h2>
        <p
          // variants={fadeUpVarient(0.06)}
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true }}
          className="text-sm text-accent-2"
        >
          {subheading}
        </p>
      </div>

      {extraText ? (
        <div className="flex items-center justify-end text-accent-2 mt-1.5">
          <Link
            href={extraLink ?? ""}
            className="border-b flex items-center justify-center"
          >
            {extraText}
            <GoArrowDownLeft className="rotate-180 ml-1.5" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
