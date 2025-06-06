import React from "react";
import CheckBox from "../Utils/CheckBox";
import Button from "../Button";
import AvilableDatesList from "../Packages/AvilableDatesList";
import { BsCurrencyRupee } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { LuSignalHigh } from "react-icons/lu";
import { PiGlobeStand } from "react-icons/pi";
import { TbTimeDuration0 } from "react-icons/tb";
import Link from "next/link";
import { cn } from "@/lib/utils";

const OVERVIEW_POINTS = [
  {
    id: "1",
    title: "Region",
    value: "Sikkim",
    icon: <CiLocationOn />,
  },
  {
    id: "2",
    title: "Best Time",
    value: "September to June",
    icon: <PiGlobeStand />,
  },
  {
    id: "3",
    title: "Trek Duration",
    value: "6 days",
    icon: <TbTimeDuration0 />,
  },
  {
    id: "4",
    title: "Highest Altitude",
    value: "12,516 ft",
    icon: <LuSignalHigh />,
  },
  {
    id: "5",
    title: "Suitable For",
    value: "11 to 62 years",
    icon: <GoPeople />,
  },
  {
    id: "6",
    title: "Trek Distance",
    value: "22 kms",
    icon: <TbTimeDuration0 />,
  },

  {
    id: "7",
    title: "Price",
    value: "2000 Rs",
    icon: <BsCurrencyRupee />,
  },
];

function PackageDetailsCard() {
  return (
    <div className="w-full p-10 space-y-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] rounded-2xl max-sm:p-5 max-sm:shadow-none">
      <div className="space-y-1">
        <h1 className="font-semibold font-primary text-xl">
          Bali - Nusa Penida Island Tour
        </h1>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 font-primary">
            Bali to Nusa Penida
          </span>

          <span className="flex items-center gap-0.5 font-primary">
            <FaStar className="text-accent" size={12} />
            <span className="font-medium text-xs ml-1.5">4.72</span>
            <span className="inline-block size-1.5 rounded-full bg-primary mx-1.5"></span>
            <Link href={"#"} className="text-xs text-gray-500 underline">
              60 Reviews
            </Link>
          </span>
        </div>
      </div>

      {/* <span className="font-semibold text-2xl">₹2000</span> */}

      <ul className="flex items-start gap-2 flex-col font-primary">
        {OVERVIEW_POINTS.map((item, index) => (
          <li key={item.id} className="flex items-center gap-1.5">
            <span className="size-[20px] pt-0.5">{item.icon}</span>
            <span className="text-sm text-gray-500">
              <span>{item.title}</span>
              <span> : </span>
              <span
                className={cn(
                  "border-b border-gray-400",
                  index === OVERVIEW_POINTS.length - 1
                    ? "font-semibold text-green-700"
                    : ""
                )}
              >
                {item.value}
              </span>
              {index === OVERVIEW_POINTS.length - 1 ? (
                <span className="text-red-400 line-through text-xs ml-1.5">
                  5000 Rs
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      <div className="space-y-1.5">
        <h2 className="font-medium font-primary relative">
          <span>Available Dates</span>
          <span className="inline-block size-1.5 rounded-full bg-green-600 float-right absolute top-2 ml-2.5"></span>
        </h2>

        <AvilableDatesList />
      </div>
      <Button className="!bg-accent font-primary !font-medium !w-full !shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
        Book Now
      </Button>

      <div>
        <h2 className="font-medium font-primary relative">Add On</h2>

        <ul className="space-y-1.5">
          {[1, 2, 3].map((item) => (
            <li key={item}>
              <CheckBox
                className="text-xs"
                label="+ Rs. 3200 Backpack Offloading"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PackageDetailsCard;
