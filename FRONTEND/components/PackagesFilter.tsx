import { TRAKE_FILTERS } from "@/constant";
import React from "react";

export default function PackagesFilter() {
  return (
    <ul className="font-primary space-y-3 p-6">
      {TRAKE_FILTERS.map((item) => (
        <li key={item.id}>
          <h3 className="text-sm">{item.heading}</h3>

          <ul className="pl-3.5 space-y-2 pt-2">
            {item.options.map((option) => (
              <li key={option.id}>
                <label className="inline-flex items-center group cursor-pointer w-full">
                  <input type="checkbox" className="appearance-none peer" />
                  <div className="w-4 h-4 border rounded-sm border-gray-300 flex items-center justify-center group-hover:border-accent peer-checked:bg-accent peer-checked:border-accent transition-colors">
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
                  <div className="flex items-center justify-between w-full">
                    <span className="ml-2 text-sm text-gray-700 group-hover:text-accent peer-checked:text-accent">
                      {option.text}
                    </span>

                    {/* <span>120</span> */}
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
