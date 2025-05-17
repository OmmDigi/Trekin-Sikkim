"use client";

import React from "react";

function DropDown() {
  return (
    <div className="relative">
      {/* <h2>Destination</h2> */}
      <div className="z-10 bg-white rounded-lg shadow-sm w-60 dark:bg-gray-700">
        <div className="p-3">
          <label htmlFor="input-group-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search.."
            />
          </div>
        </div>
        <ul className="px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
          {[1, 2, 3].map((item) => (
            <li key={item}>
              <div className="flex items-center ps-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300">
                  Leslie Livingston
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropDown;
