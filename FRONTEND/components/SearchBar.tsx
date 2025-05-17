import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  return (
    <div className="relative min-w-96 max-sm:min-w-full font-primary">
      <div className="bg-light-gray flex items-center gap-2 px-2.5 py-2.5 rounded-4xl">
        <div className="p-1 bg-text-secondary rounded-full">
          <CiSearch />
        </div>
        <input
          placeholder="Search Destination"
          className="bg-transparent outline-none text-body w-full"
        />
      </div>

      {/* Suggestions */}
      <div className="absolute hidden w-full z-[99] mt-2">
        <ul className="bg-secondary rounded-4xl border border-gray-200 shadow-2xl p-5 overflow-hidden space-y-3">
          {[1, 2, 3].map((item) => (
            <li key={item}>
              <Link href={"/"} className="flex items-start gap-3">
                <div className="size-14">
                  <div className="size-12 bg-gray-100 rounded-xl"></div>
                </div>

                <div className="pt-1">
                  <h2 className="font-semibold line-clamp-1 text-sm">
                    Kanchenjunga Base Camp Trek
                  </h2>
                  <p className="line-clamp-1 text-xs text-gray-500">
                    This is a classic trek known for its stunning views of Mount
                    Kanchenjunga and other Himalayan peaks.{" "}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
