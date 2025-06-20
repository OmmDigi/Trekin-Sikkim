"use client";

import { NavOptions } from "@/types";
import React, { useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setVisibility } from "@/redux/slices/mobileNav.slice";
import { cn } from "@/lib/utils";
import { NAV_OPTIONS } from "@/constant";

interface IProps {
  option: NavOptions;
  className?: string;
  index: number;
}

export default function NavItem({ option, className, index }: IProps) {
  // const pathname = usePathname();
  const dispatch = useDispatch();

  const [submenuVisibility, setSubmenuVisibility] = useState(false);

  const ref = useOutsideClick<HTMLLIElement>(() => setSubmenuVisibility(false));

  return (
    <li
      onClick={(e) => e.stopPropagation()}
      ref={ref}
      className="relative"
      onMouseEnter={() => setSubmenuVisibility(true)}
      onMouseLeave={() => setSubmenuVisibility(false)}
    >
      <Link
        onClick={() => {
          if (!option.submenu) {
            dispatch(setVisibility(false));
          }
          setSubmenuVisibility(!submenuVisibility);
        }}
        href={option.pathname}
        className={cn(
          "flex items-center gap-1.5",
          option.icon ? "pr-5" : "px-5",
          "text-sm py-2.5 relative px-3 min-w-full cursor-pointer transition-all duration-500",
          className
        )}
      >
        {option.icon}

        <span className="font-[500] flex-[1]">{option.text}</span>

        {option.submenu ? (
          <ChevronDown
            size={15}
            className={submenuVisibility ? "rotate-180" : ""}
          />
        ) : null}

        {index === NAV_OPTIONS.length - 1 ? null : (
          <div className="h-3 w-[1px] bg-gray-300 absolute right-0 max-sm:hidden"></div>
        )}
      </Link>

      {option.submenu && submenuVisibility ? (
        <div className="absolute top-[2rem] font-primary max-sm:static text-sm max-sm:text-base">
          <div className="min-w-60 relative top-[2rem] max-sm:top-[0.30rem]">
            <ul className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full backdrop-blur-xl shadow-2xl rounded-b-xl max-sm:rounded-none max-sm:shadow-none overflow-hidden">
              {option.submenu.map((eSubmenu) => (
                <li key={eSubmenu.id}>
                  <Link
                    onClick={() => {
                      if (!eSubmenu.submenu) {
                        dispatch(setVisibility(false));
                      }
                    }}
                    className="block p-3 py-2.5 w-full hover:bg-red-500 hover:text-white text-white"
                    href={eSubmenu.pathname}
                  >
                    {eSubmenu.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </li>
  );
}
