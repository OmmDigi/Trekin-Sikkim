import api from "@/lib/axios";
import { IResponse } from "@/types";
import React from "react";

interface IProps {
  package_id: number;
}

interface IOverview {
  package_id: number;
  overview: string;
}

export default async function Overview({ package_id }: IProps) {
  const overview = (
    await api.get<IResponse<IOverview>>(
      `/api/v1/package/overview/${package_id}`
    )
  ).data;

  return (
    <>
      <p
        dangerouslySetInnerHTML={{ __html: overview.data.overview }}
        className="text-sm leading-7 mt-4"
      ></p>
    </>
  );
}
