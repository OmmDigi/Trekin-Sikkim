import { cn } from "@/lib/utils";
import React from "react";
import SpinnerSvg from "./SpinnerSvg";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  theme?: "black" | "white" | "gray" | "accent";
  loading?: boolean;
}

function Button({
  icon,
  theme,
  loading,
  children,
  className,
  ...rest
}: IProps) {
  return (
    <button
      {...rest}
      className={cn(
        "flex items-center justify-center gap-1.5",
        icon ? "pr-5 max-sm:py-2" : "px-5 max-sm:py-3",
        "text-body py-2.5 rounded-full cursor-pointer transition-all duration-300",
        theme === "black"
          ? "bg-primary text-secondary"
          : theme === "white"
          ? "bg-secondary"
          : theme === "accent"
          ? "bg-accent font-semibold text-white"
          : "bg-light-gray",
        "text-sm active:scale-90",
        className
      )}
    >
      {icon ? <div className="p-1 bg-white rounded-full">{icon}</div> : null}
      {loading ? <SpinnerSvg size="18px" /> : children}
    </button>
  );
}

export default Button;
