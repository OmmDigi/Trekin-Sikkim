import React from "react";
import SpinnerSvg from "./SpinnerSvg";
import { cn } from "@/lib/utils";

interface IProps extends React.ComponentProps<"div"> {
  loadersize?: string;
  loadertext?: string;
}

function Loading({
  loadersize = "18px",
  loadertext = "Loading...",
  ...props
}: IProps) {
  return (
    <div
      {...props}
      className={cn(
        "wrapper flex items-center justify-center gap-5",
        props.className
      )}
    >
      <SpinnerSvg size={loadersize} />
      <p>{loadertext}</p>
    </div>
  );
}

export default Loading;
