"use client";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import CheckBox from "../Utils/CheckBox";

const AVILABLE_DATES = [
  {
    month_name: "March",
    dates: [1, 2, 3, 4, 5],
  },
  {
    month_name: "April",
    dates: [1, 2, 3, 4, 5],
  },
];

export default function AvilableDatesList() {
  const [expandItemIndex, setExpandItemIndex] = useState(-1);

  return (
    <ul className="font-primary space-y-3">
      {AVILABLE_DATES.map((date, pIndex) => (
        <li
          key={pIndex}
          onClick={() =>
            setExpandItemIndex((prev) => (prev === pIndex ? -1 : pIndex))
          }
          className="text-sm bg-amber-100 px-4 py-2.5 rounded-xl"
        >
          <div
            key={date.month_name}
            className={`flex items-center justify-between font-semibold ${
              expandItemIndex === pIndex ? "pb-2" : ""
            } transition-all duration-300`}
          >
            {date.month_name}
            <IoMdArrowDropdown
              size={18}
              className={`cursor-pointer ${
                expandItemIndex === pIndex ? "rotate-180" : ""
              } transition-all duration-300`}
            />
          </div>

          <ul
            className={`space-y-1.5 bg-amber-100 overflow-hidden ${
              expandItemIndex === pIndex ? "max-h-[500px]" : "max-h-0"
            } transition-all duration-500`}
          >
            {date.dates.map((item) => (
              <li
                key={item}
                className="text-xs py-1.5 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block size-1.5 rounded-full bg-green-600 float-right"></span>
                  <span>15 Mar, 2025 - 18 Mar, 2025</span>
                </div>
                {/* <label className="inline-flex items-center group cursor-pointer">
                  <input type="checkbox" className="appearance-none peer" />
                  <div className="w-4 h-4 border rounded-sm border-gray-400 flex items-center justify-center group-hover:border-primary peer-checked:bg-primary peer-checked:border-primary transition-colors">
                    <svg
                      className="w-3 h-3 text-white opacity-100 peer-checked:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </label> */}
                <CheckBox checkBoxColor="#007C00" checkIconColor="#fff"/>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
