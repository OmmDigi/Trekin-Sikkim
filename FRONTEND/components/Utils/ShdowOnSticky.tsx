"use client";

import { cn } from "@/lib/utils";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

export default function ShdowOnSticky(props: IProps) {
  const [isSticky, setIsSticky] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0); // Becomes true when stuck
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      {...props}
      className={cn(
        isSticky ? "shadow-[0px_1px_6px_0px_rgba(50,_50,_93,_0.25)]" : "",
        props.className ? props.className : ""
      )}
      ref={divRef}
    >
      {props.children}
    </div>
  );
}
