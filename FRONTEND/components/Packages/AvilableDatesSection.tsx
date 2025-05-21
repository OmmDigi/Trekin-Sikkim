import React from "react";
import Tabs from "../Tabs";
import { IPackageInfoSearchParams, IResponse } from "@/types";
import api from "@/lib/axios";
import { formatDateToReadable } from "../Utils/formatDateToReadable";
import { cn } from "@/lib/utils";
import AvilableDateCheckbox from "./AvilableDateCheckbox";

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
    await api.get<IResponse<IDepartureDate[]>>(
      `/api/v1/package/departure-date/${package_id}?${newSearchParams.toString()}`
    )
  ).data;

  return (
    <>
      {/* <h2 className="font-medium font-primary relative text-xl">
        <span>Avaliable Dates</span>
        <span className="inline-block size-1.5 rounded-full bg-green-600 float-right absolute top-2 ml-2.5"></span>
      </h2> */}
      <h3
        id="Overview"
        className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg"
      >
        Avaliable Dates :
      </h3>

      <span id="package-dates"></span>
      <Tabs
        selectedTabCss="bg-accent !text-white !font-semibold"
        scroll={false}
        selectedItemId={searchParams.month}
        options={[
          { id: "January", text: "January", slug: "?month=January" },
          { id: "February", text: "February", slug: "?month=February" },
          { id: "March", text: "March", slug: "?month=March" },
          { id: "April", text: "April", slug: "?month=April" },
          { id: "May", text: "May", slug: "?month=May" },
          { id: "June", text: "June", slug: "?month=June" },
          { id: "July", text: "July", slug: "?month=July" },
          { id: "August", text: "August", slug: "?month=August" },
          { id: "September", text: "September", slug: "?month=September" },
          { id: "October", text: "October", slug: "?month=October" },
          { id: "November", text: "November", slug: "?month=November" },
          { id: "December", text: "December", slug: "?month=December" },
        ]}
      />

      <ul className="space-y-1.5 px-5">
        {dateInfo.data.map((item) => (
          <li
            key={item.id}
            className="text-xs py-1.5 cursor-pointer flex justify-between"
          >
            <div className="flex justify-between flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-green-600 float-right"></span>
                <span className="text-lg underline">
                  {formatDateToReadable(item.from_date)} -{" "}
                  {formatDateToReadable(item.to_date)}
                </span>
              </div>

              <div className="flex items-center justify-center">
                <span
                  className={cn(
                    "font-semibold",
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

            <div className="flex justify-end">
              {item.avilibility_color === "Red" ? null : (
                <AvilableDateCheckbox key={item.id} date_id={item.id} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
