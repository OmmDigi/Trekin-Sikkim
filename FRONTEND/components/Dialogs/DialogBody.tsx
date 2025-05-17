"use client";

import { cn } from "@/lib/utils";

interface IProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  theme: "none" | "white";
}

export default function DialogBody({
  children,
  className,
  theme,
  ...props
}: IProps) {
  return (
    <div
      {...props}
      onClick={(e) => e.stopPropagation()}
      className={cn(theme === "white" ? "min-w-96 bg-white" : "", className)}
    >
      {children}
    </div>
  );
}
