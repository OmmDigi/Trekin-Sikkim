"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface IProps {
  isChecked: boolean;
  key: string;
  value: string;
}

export default function CheckBox({ isChecked, key, value }: IProps) {
  const routes = useRouter();
  const pathaname = usePathname();
  const searchParams = useSearchParams();
  const handleCheckBoxClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (isChecked) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }
    routes.push(`${pathaname}?${newSearchParams.toString()}`);
  };

  return (
    <button onClick={handleCheckBoxClick} className="flex items-center gap-2">
      <div
        className={cn(
          "size-5 border rounded-md border-accent",
          isChecked
            ? "bg-accent text-secondary flex items-center justify-center"
            : ""
        )}
      >
        <Check color="#fff" className="size-3.5" />
      </div>
      <span className="font-semibold">Choose Date</span>
    </button>
  );
}
