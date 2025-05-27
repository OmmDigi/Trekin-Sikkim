import React from "react";
import Tabs from "../Tabs";
import { IPackageInfoSearchParams, IResponse } from "@/types";
import api from "@/lib/axios";
import { formatDateToReadable } from "../Utils/formatDateToReadable";
import { cn } from "@/lib/utils";
import AvilableDateCheckbox from "./AvilableDateCheckbox";
import Button from "../Button";
import { Check } from "lucide-react";
import CheckBox from "../CheckBox";

interface IProps {
  package_id: number;
  searchParams: IPackageInfoSearchParams;
}

// const MONTH_LIST = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

interface IDepartureDate {
  id: number;
  package_id: number;
  for_month: string;
  from_date: string;
  to_date: string;
  max_seats: number;
  avilibility_text: string;
  avilibility_color: "Red" | "Green" | "Yellow";
}

export default async function AvilableDatesSection({
  package_id,
  searchParams,
}: IProps) {
  const newSearchParams = new URLSearchParams();
  if (searchParams.month) {
    newSearchParams.set("for_month", searchParams.month);
  }

  const dateInfo = (
    await api.get<
      IResponse<{ months: string[]; dates_info: IDepartureDate[] }>
    >(
      `/api/v1/package/departure-date/${package_id}?${newSearchParams.toString()}`
    )
  ).data;

  const selectedDates = newSearchParams.getAll("date_id");

  return (
    <>
      {dateInfo.data.months.length === 0 ? null : (
        <h3
          id="Overview"
          className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg"
        >
          Avaliable Dates :
        </h3>
      )}

      <span id="package-dates"></span>
      {dateInfo.data.months.length === 0 ? null : (
        <Tabs
          selectedTabCss="bg-[#333333] !text-white !font-semibold"
          scroll={false}
          selectedItemId={searchParams.month}
          options={dateInfo.data.months.map((avilableMonth) => ({
            id: avilableMonth,
            text: avilableMonth,
            slug: `?month=${avilableMonth}`,
          }))}
        />
      )}

      {dateInfo.data.months.length === 0 ? null : (
        <ul className="space-y-2.5">
          {dateInfo.data.dates_info.map((item) => (
            <li
              key={item.id}
              className="text-xs py-3.5 max-sm:py-1.5 cursor-pointer flex justify-between border px-3.5 bg-red-50 border-gray-300"
            >
              <div className="flex justify-between flex-1 max-sm:flex-col max-sm:items-start">
                <div className="flex items-center gap-2">
                  <span className="inline-block size-1.5 rounded-full bg-green-600 float-right max-sm:hidden"></span>
                  <span className="text-lg">
                    {formatDateToReadable(item.from_date)} -{" "}
                    {formatDateToReadable(item.to_date)}
                  </span>
                </div>

                <div className="flex items-center justify-center flex-1">
                  <span
                    className={cn(
                      "font-semibold text-xl animate-pulse max-sm:text-sm",
                      item.avilibility_color === "Red"
                        ? "text-red-600"
                        : item.avilibility_color === "Green"
                        ? "text-green-600"
                        : "text-yellow-600"
                    )}
                  >
                    {item.avilibility_text}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <AvilableDateCheckbox key={item.id} date_id={item.id} />
                <span className="max-sm:hidden">Choose Date</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
