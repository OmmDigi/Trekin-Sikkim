import { cn } from "@/lib/utils";
import React from "react";

interface IProps extends React.ComponentProps<"main"> {
  children: React.ReactNode;
}

export default function MainWrapper({ children, ...props }: IProps) {
  return (
    <main {...props} className={cn(props.className, "!mt-24")}>
      {children}
    </main>
  );
}
