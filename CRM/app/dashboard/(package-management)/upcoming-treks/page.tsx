"use client";
import ChoosePackagesDialog from "@/components/dialogs/ChoosePackagesDialog";
import LoadingHandler from "@/components/LoadingHandler";
import PackageItem from "@/components/package/PackageItem";
import { Button } from "@/components/ui/button";
import { IPackageList } from "@/features/package/schemaAndTypes";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";

import React, { useState } from "react";

const getPackageListForUpcomingPackge = async () =>
  (await api.get(`/api/v1/upcoming`)).data;

export default function UpcomingTrek() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isFetching, error } = useQuery<
    IResponse<IPackageList[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-upcoming-package-list"],
    queryFn: getPackageListForUpcomingPackge,
  });

  return (
    <>
      <ChoosePackagesDialog
        key={`${isOpen}`}
        isOpen={isOpen}
        setOpen={setIsOpen}
      />
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">Upcoming Treks</h2>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Plus />
            Choose Packages
          </Button>
        </div>
      </div>

      <LoadingHandler
        error={error}
        loading={isFetching}
        length={data?.data.length}
      >
        <ul className="grid grid-cols-3 gap-10 mt-10">
          {data?.data.map((item) => (
            <li className="w-full overflow-hidden border-2 border-b-green-300 rounded-[.8rem] relative shadow-2xl group/item max-sm:h-[17rem]">
              <PackageItem packageItem={item} />
            </li>
          ))}
        </ul>
      </LoadingHandler>
    </>
  );
}
