"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

export default function ChildrenHolder({ children }: IProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        pathname === "/auth/login" || pathname === "/auth/signup"
          ? ""
          : "mt-40 max-sm:mt-20"
      )}
    >
      {children}
    </div>
  );
}
