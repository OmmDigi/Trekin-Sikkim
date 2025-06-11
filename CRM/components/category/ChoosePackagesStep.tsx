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
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import React, { useRef, useState, useTransition } from "react";
import { ButtonLoading } from "../ui/button-loading";
import { useDoMutation } from "@/hooks/useDoMutation";

interface IProps {
  currentStep: number;
}

const getCategoryPackageList = async (searchParams: ReadonlyURLSearchParams) =>
  (
    await api.get(
      `/api/v1/package?category_id=${searchParams.get("category_id")}`
    )
  ).data;

export default function ChoosePackagesStep({ currentStep }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const route = useRouter();
  const whichBtnClick = useRef<"next" | "prev">("next");

  const { data, isFetching, error, refetch } = useQuery<
    IResponse<IPackageList[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-category-package-list"],
    queryFn: () => getCategoryPackageList(searchParams),
  });

  const { isLoading, mutate } = useDoMutation();
  const { isLoading: isDeleting, mutate: startDeleting } = useDoMutation();

  const handleAddPackages = (selectedPids: number[]) => {
    mutate({
      apiPath: "/api/v1/category/packages",
      method: "post",
      formData: {
        category_id: categoryId,
        packages_ids: selectedPids
      },
      onSuccess() {
        refetch();
        setIsOpen(false);
      }
    })
  }

  return (
    <>
      <ChoosePackagesDialog
        key={`${isOpen}`}
        isOpen={isOpen}
        setOpen={setIsOpen}
        onDoneBtnClick={handleAddPackages}
        isSubmitting={isLoading}
      />
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">Category Packages</h2>
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
            <li key={item.id} className="w-full overflow-hidden border-2 border-b-green-300 rounded-[.8rem] relative shadow-2xl group/item max-sm:h-[17rem]">
              <PackageItem onDeleteBtnClick={() => {
                if (!confirm("Are you sure you want to delete ?")) return;
                startDeleting({
                  apiPath: `/api/v1/category/package/${categoryId}/${item.id}`,
                  method: "delete",
                  onSuccess() {
                    refetch();
                  }
                })
              }} packageItem={item} isDeleting={isDeleting} />
            </li>
          ))}
        </ul>
      </LoadingHandler>

      {/* <Bu onClick={()}>Submit & Next</Button> */}
      <div className="flex items-center justify-between">
        <ButtonLoading
          variant="secondary"
          loading={whichBtnClick.current === "prev" && isPending}
          onClick={() => {
            whichBtnClick.current = "prev";
            startTransition(() => {
              route.push(
                `?step=${currentStep - 1}&category_id=${categoryId}`
              );
            });
          }}
        >
          Previous
        </ButtonLoading>
        <ButtonLoading
          loading={whichBtnClick.current === "next" && isPending}
          onClick={() => {
            whichBtnClick.current = "next";
            startTransition(() => {
              route.push(
                `?step=${currentStep + 1}&category_id=${categoryId}`
              );
            });
          }}
        >
          Next
        </ButtonLoading>
      </div>
    </>
  );
}
