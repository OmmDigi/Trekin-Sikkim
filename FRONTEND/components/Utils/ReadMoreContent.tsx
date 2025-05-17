"use client";

import { useReadmore } from "./ReadMore";

interface IProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}
export default function ReadMoreContent({ children, ...props }: IProps) {
  const { isOpen } = useReadmore();
  return (
    <div
      {...props}
      className={`${isOpen ? "max-h-fit" : "max-h-0"} overflow-hidden ${
        props.className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
