"use client";

import { ITabOptions } from "@/types";
import React, { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SpinnerSvg from "./SpinnerSvg";

interface IProps {
  options: ITabOptions[];
  onClick?: (option: ITabOptions, index: number) => void;
  selectedTabCss?: string;
  scroll?: boolean;
  selectedItemId?: any;
}

function Tabs({
  options,
  onClick,
  selectedTabCss,
  scroll = true,
  selectedItemId,
}: IProps) {
  const [selectedId, setSelectedId] = useState(
    selectedItemId ? selectedItemId : options[0].id
  );

  const [isPending, startTransition] = useTransition();
  const routes = useRouter();

  //  max-sm:flex-nowrap max-sm:overflow-x-scroll
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {options.map((option, index) => (
        <Link
          scroll={scroll}
          href={option.slug || "#"}
          className={cn(
            "flex items-center max-sm:shrink-0 gap-1.5 text-xs font-semibold py-2.5 rounded-full px-3 cursor-pointer transition-all duration-500 border-1 border-gray-300",
            option.icon ? "pr-5" : "px-5",
            selectedId === option.id
              ? selectedTabCss || "bg-primary text-white"
              : "bg-light-gray text-primary"
          )}
          onClick={(e) => {
            e.preventDefault();

            if (option.slug === "#") return;

            setSelectedId(option.id);
            onClick?.(option, index);
            startTransition(() => {
              routes.push(option.slug || "", { scroll: scroll });
            });
          }}
          key={option.id}
        >
          {isPending && selectedId === option.id ? (
            <SpinnerSvg size="15px" />
          ) : null}
          {option.icon ? (
            <div className="p-1 bg-white rounded-full">{option.icon}</div>
          ) : null}

          <span className="font-medium">{option.text}</span>
        </Link>
      ))}
    </div>
  );
}

export default Tabs;
