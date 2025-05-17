import { cn } from "@/lib/utils";
import React from "react";
import SpinnerSvg from "./SpinnerSvg";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  theme?: "black" | "white" | "gray" | "accent";
  loading?: boolean;
}

function Button(props: IProps) {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center gap-1.5",
        props.icon ? "pr-5 max-sm:py-2" : "px-5 max-sm:py-3",
        "text-body py-2.5 rounded-full cursor-pointer transition-all duration-300",
        props.className,
        props.theme === "black"
          ? "bg-primary text-secondary"
          : props.theme === "white"
          ? "bg-secondary"
          : props.theme === "accent"
          ? "bg-accent font-semibold text-white"
          : "bg-light-gray",
        "text-sm active:scale-90"
        //hover:scale-105
      )}
    >
      {props.icon ? (
        <div className="p-1 bg-white rounded-full">{props.icon}</div>
      ) : null}
      {props.loading ? <SpinnerSvg size="18px" /> : props.children}
    </button>
  );
}

export default Button;
