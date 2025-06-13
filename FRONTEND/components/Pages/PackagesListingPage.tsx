import PackageItem from "@/components/PackageItem";
import React from "react";
import Pagination from "@/components/Pagination";
import { CiFilter } from "react-icons/ci";
import HandleDialogBtn from "@/components/Dialogs/HandleDialogBtn";
import api from "@/lib/axios";
import { IPackageListInfo, IResponse } from "@/types";

interface IProps {
  category_slug: string;
  current_page: number;
}

export default async function PackagesListingPage({
  category_slug,
  current_page,
}: IProps) {
  const newUrlSearchParams = new URLSearchParams();
  newUrlSearchParams.set("category_slug", category_slug);
  newUrlSearchParams.set("page", current_page.toString());

  const packageList = (
    await api.get<IResponse<IPackageListInfo[]>>(
      `/api/v1/package?${newUrlSearchParams.toString()}`
    )
  ).data;

  if (packageList.data.length === 0) return <></>;

  return (
    <main id="packages-list" className="wrapper py-10 space-y-5 max-sm:py-5">
      <div>
        <h1 className="font-semibold text-3xl">Our Packages</h1>
        <p className="text-sm text-gray-400">
          Explore Our Packages Tailored to Your Needs
        </p>
      </div>
      {/* Filters */}
      <section className="grid grid-cols-4 gap-5 max-sm:grid-cols-1 max-sm:gap-y-5">
        <HandleDialogBtn
          id="mobile_filter"
          action_type="OPEN"
          className="hidden items-center gap-2 font-medium max-sm:flex"
        >
          <CiFilter />
          <span>Filters</span>
        </HandleDialogBtn>

        <div className="col-span-4 space-y-10 max-sm:col-auto">
          <ul
            key={current_page}
            className="grid grid-cols-4 gap-x-3 gap-y-3.5 w-full max-sm:grid-cols-1"
          >
            {packageList.data.map((packageItem) => (
              <li key={packageItem.id}>
                <PackageItem
                  fromWhere="normal"
                  singlePackageInfo={packageItem}
                />
              </li>
            ))}
          </ul>

          <Pagination
            page={current_page}
            totalPage={packageList.totalPage}
            onPageClickChangeSearchParams
          />
        </div>
      </section>
    </main>
  );
}
