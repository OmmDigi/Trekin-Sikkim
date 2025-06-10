"use client";
import ChoosePackagesDialog from "@/components/dialogs/ChoosePackagesDialog";
import LoadingHandler from "@/components/LoadingHandler";
import PackageItem from "@/components/package/PackageItem";
import { Button } from "@/components/ui/button";
import { IPackageList } from "@/features/package/schemaAndTypes";
import { useDoMutation } from "@/hooks/useDoMutation";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";

import React, { useRef, useState } from "react";

const getPackageListForUpcomingPackge = async () =>
  (await api.get(`/api/v1/upcoming`)).data;

export default function UpcomingTrek() {
  const [isOpen, setIsOpen] = useState(false);
  const clickedPackage = useRef(-1);

  const { data, isFetching, error, refetch } = useQuery<
    IResponse<IPackageList[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-upcoming-package-list"],
    queryFn: getPackageListForUpcomingPackge,
  });



  const handleDoneClick = (selectedIds: number[]) => {
    if (selectedIds.length === 0) return alert("No packages are selected");
    mutate({
      apiPath: "/api/v1/upcoming/modify",
      method: "post",
      formData: selectedIds,
      onSuccess() {
        setIsOpen(false);
        refetch();
      },
    });
  };

  const { isLoading, mutate } = useDoMutation();
  return (
    <>
      <ChoosePackagesDialog
        key={`${isOpen}`}
        isOpen={isOpen}
        setOpen={setIsOpen}
        onDoneBtnClick={handleDoneClick}
        isSubmitting={isLoading}
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
              <PackageItem packageItem={item} onDeleteBtnClick={() => {
                if (!confirm("Are you sure you want to remove this package form upcomming packages")) return;
                clickedPackage.current = item.id
                mutate({
                  apiPath: "/api/v1/upcoming",
                  method: "delete",
                  id: item.id,
                  onSuccess() {
                    refetch()
                  }
                })
              }} isDeleting={clickedPackage.current === item.id && isLoading} />
            </li>
          ))}
        </ul>
      </LoadingHandler>
    </>
  );
}
