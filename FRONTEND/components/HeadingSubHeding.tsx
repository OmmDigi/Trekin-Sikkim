import React from "react";
import Link from "next/link";
import { GoArrowDownLeft } from "react-icons/go";
import { cn } from "@/lib/utils";

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
        <h2 className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2">
          {heading}
        </h2>
        <p className="text-sm text-accent-2">{subheading}</p>
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
