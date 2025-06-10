"use client";

import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import PackageItem from "@/components/package/PackageItem";
import { Loader2, Plus } from "lucide-react";
import LinkButton from "@/components/link-button";
import { CATEGORY_TYPE } from "@/constant";
import {
  useQueries,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { ICategories } from "@/features/category/types";
import { getAllCategories } from "@/features/category/api/category";
import api from "@/lib/axios";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { IPackageList } from "@/features/package/schemaAndTypes";
import { useDoMutation } from "@/hooks/useDoMutation";
import LoadingHandler from "@/components/LoadingHandler";
import { PaginationComp } from "@/components/pagination";

const getPackageList = async (searchParams: ReadonlyURLSearchParams) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set("limit", "12")
  // if (newSearchParams.get("category_slug") === "all") {
  //   newSearchParams.delete("category_slug");
  // }
  // if (!newSearchParams.has("category_type")) {
  //   newSearchParams.set("category_type", CATEGORY_TYPE[0].id.toString());
  // }
  // console.log(`/api/v1/package?${newSearchParams.toString()}`)
  return (await api.get("/api/v1/package?" + newSearchParams.toString())).data;
};

export default function Packages() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const route = useRouter();
  // const [currentCategorySlug, setCurrentCatSLug] = useState("all");

  // const [isPending, startTransition] = useTransition();

  const apiResult = useQueries<
    [
      UseQueryResult<IResponse<IPackageList[]>, AxiosError<IResponse>>,
      // UseQueryResult<IResponse<ICategories[]>, AxiosError<IResponse>>
    ]
  >({
    queries: [
      {
        queryKey: ["get-package-list", searchParams.toString()],
        queryFn: () => getPackageList(searchParams),
      },

      // {
      //   queryKey: ["package-categories", searchParams.get("category_type")],
      //   queryFn: () =>
      //     getAllCategories(
      //       searchParams.get("category_type") || CATEGORY_TYPE[0].id.toString()
      //     ),
      // },
    ],
  });

  const { isLoading, mutate } = useDoMutation();

  const handleDelete = (package_id: number) => {
    if (!confirm("Are you sure you want to delete this ?")) return;

    mutate({
      apiPath: "/api/v1/package",
      method: "delete",
      id: package_id,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["get-package-list"] });
      },
    });
  };

  return (
    <main className="space-y-5">
      <div className="flex items-center mb-5">
        <Label className="font-semibold text-2xl flex-1">Packages</Label>

        <div className="flex items-center gap-5">
          {/* <Select
            onValueChange={(value) => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set("category_type", value);
              route.push(`/dashboard/packages?${newSearchParams.toString()}`);
            }}
          >
            <SelectTrigger>
              <SelectValue
                defaultValue={CATEGORY_TYPE[0].id}
                placeholder={CATEGORY_TYPE[0].name}
              />
            </SelectTrigger>

            <SelectContent>
              {CATEGORY_TYPE.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          <LinkButton icon={<Plus />} href="packages/0">
            Add New Package
          </LinkButton>
        </div>
      </div>
      {/* <Tabs
        value={searchParams.get("category_slug") || "all"}
        onValueChange={(value) => {
          if (isPending) return;
          setCurrentCatSLug(value);
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("category_slug", value);
          startTransition(() => {
            route.push(`?${newSearchParams.toString()}`);
          });
        }}
        className="w-full"
      >
        <TabsList className="flex flex-wrap justify-start gap-2 p-1.5">
          <TabsTrigger
            className="px-10 py-2 rounded-md max-w-fit cursor-pointer"
            value={"all"}
          >
            {isPending && currentCategorySlug === "all" ? (
              <Loader2 className="animate-spin" size={18} />
            ) : null}
            All Category
          </TabsTrigger>
          {apiResult[1].data?.data.map((category) => (
            <TabsTrigger
              className="px-10 py-2 rounded-md max-w-fit cursor-pointer"
              key={category.category_id}
              value={category.slug}
            >
              {isPending && currentCategorySlug === category.slug ? (
                <Loader2 className="animate-spin" size={18} />
              ) : null}
              {category.category_name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs> */}
      <LoadingHandler
        error={apiResult[0].error}
        loading={apiResult[0].isFetching}
        noDataMsg="No Package Avilable"
        length={apiResult[0].data?.data.length}
      >
        <ul className="grid grid-cols-3 gap-10 w-full max-sm:grid-cols-2 max-sm:gap-2.5">
          {apiResult[0].data?.data.map((packageItem) => (
            <li
              key={packageItem.id}
              className="w-full overflow-hidden border-2 border-b-green-300 rounded-[.8rem] relative shadow-2xl group/item max-sm:h-[17rem]"
            >
              <PackageItem
                packageItem={packageItem}
                onDeleteBtnClick={() => handleDelete(packageItem.id)}
                isDeleting={isLoading}
              />
            </li>
          ))}
        </ul>
        <PaginationComp
          page={parseInt(searchParams.get("page") || "1")}
          totalPage={apiResult[0].data?.totalPage}
          onPageClick={(page) => {
            const urlSearchParams = new URLSearchParams(searchParams);
            urlSearchParams.set("page", page.toString());
            route.push(`?${urlSearchParams.toString()}`);
          }}
        />
      </LoadingHandler>
    </main>
  );
}
