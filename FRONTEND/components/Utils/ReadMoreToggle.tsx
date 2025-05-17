"use client";

import { useReadmore } from "./ReadMore";

interface IProps {
  children: React.ReactNode;
  type: "OPEN" | "CLOSE";
}

export default function ReadMoreToggle({ children, type }: IProps) {
  const { isOpen, setIsOpen } = useReadmore();
  if (!isOpen && type === "CLOSE") return null;
  if (isOpen && type === "OPEN") return null;
  return <div onClick={() => setIsOpen(type === "OPEN")}>{children}</div>;
}
