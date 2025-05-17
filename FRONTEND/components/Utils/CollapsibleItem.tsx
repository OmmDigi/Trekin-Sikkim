"use client";

import React, { ReactNode } from "react";
import { useCollapsible } from "./Collapsible"; // Import the custom hook
import { IoAdd, IoRemove } from "react-icons/io5";

interface CollapsibleItemProps {
  index: number;
  children: ReactNode;
  heading: string | React.ReactNode;
}

export const CollapsibleItem: React.FC<CollapsibleItemProps> = ({
  heading,
  index,
  children,
}) => {
  const { openIndex, toggleItem } = useCollapsible();

  return (
    <li className="flex items-start gap-4 border-b pb-4 w-full">
      <span className="font-semibold text-xl">0{index + 1}</span>
      <div className="w-full">
        <h2
          className="font-semibold text-xl flex justify-between items-center cursor-pointer max-sm:text-sm"
          onClick={() => toggleItem(index)}
        >
          {heading}
          {openIndex === index ? <IoRemove /> : <IoAdd />}
        </h2>

        <div
          className={`overflow-hidden ${
            openIndex === index ? "max-h-[500px]" : "max-h-0"
          } transition-all duration-300`}
        >
          <p
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-sm text-gray-700 mt-2 leading-7"
          >
            {children}
          </p>
        </div>
      </div>
    </li>
  );
};
