import React from "react";
import { IPackageInfoSearchParams, IResponse } from "@/types";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import AvilableDateCheckbox from "./AvilableDateCheckbox";
import { Calendar, ChevronDown } from "lucide-react";
import ReadMore from "../Utils/ReadMore";
import ReadMoreContent from "../Utils/ReadMoreContent";
import ReadMoreToggle from "../Utils/ReadMoreToggle";
import CustomLink from "../CustomLink";
import Button from "../Button";

interface IProps {
  package_id: number;
  searchParams: IPackageInfoSearchParams;
}

interface IServerResponse {
  month: string;
  year: string;
  departuredates: {
    id: number;
    package_id: number;
    from_date: string;
    to_date: string;
    max_seats: number;
    avilibility_color: string;
    avilibility_text: string;
  }[];
}

function formatDateToDayMonth(dateStr: string): string {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "Oct"

  return `${day} ${month}`;
}

export default async function AvilableDatesSection({
  package_id,
  searchParams,
}: IProps) {
  const newSearchParams = new URLSearchParams(searchParams as any);
  if (searchParams.month) {
    newSearchParams.set("for_month", searchParams.month);
  }

  const dateInfo = (
    await api.get<IResponse<IServerResponse[]>>(
      `/api/v1/package/departure-date-v2/${package_id}?${newSearchParams.toString()}`
    )
  ).data;

  return (
    <div className="space-y-2.5">
      <h3
        id="Overview"
        className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg"
      >
        Avaliable Dates :
      </h3>

      <span id="package-dates"></span>

      {dateInfo.data.length === 0 ? (
        <>
          <p className="text-sm text-gray-400 tracking-wider">
            No Avilable Dates
          </p>

          <CustomLink
            href={`/booking?package_id=${package_id}${
              newSearchParams.size !== 0 ? newSearchParams.toString() : ""
            }`}
          >
            <Button className="!bg-red-600 text-white !text-sm flex items-center gap-2.5">
              <Calendar size={15} />
              <span className="tracking-wide">Customize Your Booking</span>
            </Button>
          </CustomLink>
        </>
      ) : (
        // <div className="text-center py-12 px-6">
        //   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        //     <Calendar className="w-8 h-8 text-gray-400" />
        //   </div>
        //   <h3 className="text-lg font-semibold text-gray-900 mb-2">
        //     No Dates Available
        //   </h3>

        //   <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        //     Customize Your Booking
        //   </button>
        // </div>
        <ul>
          {dateInfo.data.map((eachDate, index) => (
            <ReadMore key={index}>
              <li className="text-xs cursor-pointer">
                <ReadMoreToggle type="OPEN">
                  <div className="flex items-center py-3.5 px-4 justify-between w-full border bg-red-50 border-gray-300">
                    <h3 className="text-xl max-sm:text-sm">
                      {eachDate.month} {eachDate.year}
                    </h3>
                    <ChevronDown className="max-sm:size-4" />
                  </div>
                </ReadMoreToggle>

                <ReadMoreToggle type="CLOSE">
                  <div className="flex items-center py-3.5 px-4 justify-between w-full border bg-red-50 border-gray-300">
                    <h3 className="text-xl max-sm:text-sm">
                      {eachDate.month} {eachDate.year}
                    </h3>
                    <ChevronDown className="rotate-180 max-sm:size-4" />
                  </div>
                </ReadMoreToggle>

                <ReadMoreContent>
                  <ul>
                    {eachDate.departuredates.map((datesInfo) => (
                      <li key={datesInfo.id}>
                        <div className="flex items-center justify-between px-8 py-2.5 max-sm:px-3.5">
                          <span className="font-semibold text-lg max-sm:text-sm">
                            {formatDateToDayMonth(datesInfo.from_date)} -{" "}
                            {formatDateToDayMonth(datesInfo.to_date)}
                          </span>

                          <div className="flex items-center justify-center">
                            <span
                              className={cn(
                                "font-semibold text-xl animate-pulse max-sm:text-xs",
                                datesInfo.avilibility_color === "Red"
                                  ? "text-red-600"
                                  : datesInfo.avilibility_color === "Green"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              )}
                            >
                              {datesInfo.avilibility_text}
                            </span>
                          </div>

                          {datesInfo.avilibility_color === "Red" ? (
                            <span></span>
                          ) : (
                            <AvilableDateCheckbox
                              key={searchParams.date_id}
                              date_id={datesInfo.id}
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </ReadMoreContent>
              </li>
            </ReadMore>
          ))}
        </ul>
      )}
    </div>
  );
}
