import api from "@/lib/axios";
import { IResponse } from "@/types";
import React from "react";

interface IProps {
  package_id: number;
}

interface ITripItinerary {
  id: number;
  package_id: number;
  itinerary_heading: string;
  itinerary_subheading: string;
  itinerary_details: string;
  created_at: string;
}

export default async function TripItinerary({ package_id }: IProps) {
  const tripItinerary = (
    await api.get<IResponse<ITripItinerary[]>>(
      `/api/v1/package/itinerary/${package_id}?withContent=true`
    )
  ).data;
  return (
    <ol className="border-accent border-s-2 dark:border-gray-700">
      {tripItinerary.data.map((itinerary) => (
        <li key={itinerary.id} className="mb-10 ms-4">
          <div className="bg-accent text-white text-primary font-semibold text-xs p-1.5 px-5 inline-block">
            <span>{itinerary.itinerary_heading}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900">
            {itinerary.itinerary_subheading}
          </h3>
          <p
            dangerouslySetInnerHTML={{ __html: itinerary.itinerary_details }}
            className="mb-4 font-normal text-gray-500 text-sm leading-7"
          ></p>
        </li>
      ))}
    </ol>
  );
}
