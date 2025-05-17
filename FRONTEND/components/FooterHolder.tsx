"use client";

import { usePathname } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

export default function FooterHolder({ children }: IProps) {
  const pathname = usePathname();
  return pathname === "/auth/login" || pathname === "/auth/signup"
    ? null
    : children;
}
