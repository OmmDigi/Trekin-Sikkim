"use client";

import React, { useState } from "react";
import { CiCalendarDate, CiLocationOn, CiSearch } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import Button from "./Button";

export const HOME_FILTERS = [
  {
    id: "f1",
    name: "Destination",
    description: "Choose Destination",
    icon: <CiLocationOn />,
  },
  {
    id: "f2",
    name: "Date",
    description: "17 Jun 2025",
    icon: <CiCalendarDate />,
  },
  {
    id: "f3",
    name: "Guest",
    description: "1 People",
    icon: <GoPeople />,
  },
];

function HomeFilter() {
  const [filters] = useState(HOME_FILTERS);

  // bg-[#ffffffef]

  return (
    <section className="w-full flex items-center justify-center absolute -bottom-12 z-50 max-sm:static">
      <div className="w-3xl bg-[#ffffffc9] backdrop-blur-sm h-24 rounded-xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] grid grid-cols-3 gap-5 px-10 relative max-sm:grid-cols-1 max-sm:h-auto max-sm:py-6 max-sm:mt-3 max-sm:border border-gray-300 max-sm:px-5">
        {filters.map((filter, index) => (
          <div
            key={filter.id}
            className="flex justify-center flex-col relative"
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <h2 className="text-deep-gray text-body font-semibold">
                {filter.name}
              </h2>
              <IoMdArrowDropdown />
            </div>
            <span className="flex items-center gap-1 text-gray-500">
              {filter.icon}
              <span className="text-sm line-clamp-1">
                {/* Goechala Trek-Trekking In Sikkim */}
                {filter.description}
              </span>
            </span>

            {index === filters.length - 1 ? null : (
              <div className="w-[1px] h-[30%] bg-gray-400 opacity-40 absolute right-0"></div>
            )}
          </div>
        ))}

        <div className="absolute right-10 top-0 bottom-0 flex items-center justify-center max-sm:hidden">
          <button className="size-10 bg-primary rounded-full text-secondary flex items-center justify-center cursor-pointer active:scale-95">
            <CiSearch size={18} />
          </button>
        </div>
        <Button theme="black" className="hidden max-sm:block">Find</Button>
      </div>
    </section>
  );
}

export default HomeFilter;
