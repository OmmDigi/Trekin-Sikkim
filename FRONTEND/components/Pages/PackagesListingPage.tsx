import PackageItem from "@/components/PackageItem";
import { childVariant, parentVariant } from "@/utils/animations";
import React from "react";
import * as motion from "motion/react-client";
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

        {/* <aside className="border-r border-gray-200 max-sm:hidden">
          <div className="py-3 border-b border-gray-200 p-6">
            <h1 className="font-semibold">Filter by:</h1>
          </div>

          <PackagesFilter />
        </aside> */}

        {/* <DialogWrapper id="mobile_filter" className="hidden max-sm:block">
          <aside className="size-full bg-white overflow-y-auto">
            <div className="py-3 border-b border-gray-200 p-6 flex items-center justify-between">
              <h1 className="font-semibold">Filter by:</h1>

              <HandleDialogBtn id="mobile_filter" action_type="CLOSE">
                <div className="!py-2 bg-primary px-6 text-sm rounded-full text-secondary">
                  Done
                </div>
              </HandleDialogBtn>
            </div>

            <PackagesFilter />
          </aside>
        </DialogWrapper> */}

        <div className="col-span-4 space-y-10 max-sm:col-auto">
          <motion.ul
            key={current_page}
            variants={parentVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-4 gap-x-3 gap-y-3.5 w-full max-sm:grid-cols-1"
          >
            {packageList.data.map((packageItem) => (
              <motion.li key={packageItem.id} variants={childVariant}>
                <PackageItem
                  fromWhere="normal"
                  singlePackageInfo={packageItem}
                />
              </motion.li>
            ))}
          </motion.ul>

          <Pagination
            page={current_page}
            totalPage={packageList.totalPage}
            onPageClickChangeSearchParams
          />
        </div>
      </section>

      {/* <FilterComponent /> */}
    </main>
  );
}
