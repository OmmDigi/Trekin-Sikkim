import { FOOTER_INFO, FOOTERSOCIALLINKS } from "@/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CustomLink from "./CustomLink";
import CategoryFooterListView from "./CategoryFooterListView";
import React from "react";
import Loading from "./Loading";
import api from "@/lib/axios";
import { ICategories, IResponse } from "@/types";

export default async function Footer() {
  const categories: ICategories[] = [];

  try {
    const response = await (
      await api.get<IResponse<ICategories[]>>(
        "/api/v1/category?add_to_footer=true"
      )
    ).data;
    if (response.data) {
      categories.push(...response.data);
    }
  } catch {}

  return (
    <footer className="w-full bg-primary font-primary text-background py-9 max-sm:text-white max-sm:py-9">
      <section className="space-y-9 wrapper max-sm:max-w-[90%] pt-16 max-sm:pt-6">
        <ul className="grid grid-cols-4 gap-10 max-sm:grid-cols-2">
          {FOOTER_INFO.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                "space-y-4",
                index === 0 ? "max-sm:col-span-2" : ""
              )}
            >
              <h2 className="font-semibold text-2xl text-secondary">
                {item.heading}
              </h2>

              <div className="w-14 h-[1px] bg-light-gray opacity-20"></div>

              <ul className="space-y-4">
                {item.info.map((cItem, index) => (
                  <li key={index}>
                    <CustomLink
                      className="text-sm text-secondary block"
                      href={cItem.pathname ?? "#"}
                    >
                      {cItem.icon ? (
                        <span className="float-left mr-2 mt-[1px]">
                          {cItem.icon}
                        </span>
                      ) : null}

                      <span>{cItem.text}</span>
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li className={cn("space-y-4")}>
            <h2 className="font-semibold text-2xl text-secondary">Category</h2>

            <div className="w-14 h-[1px] bg-light-gray opacity-20"></div>

            <React.Suspense fallback={<Loading />}>
              <CategoryFooterListView />
            </React.Suspense>
          </li>
        </ul>

        <div className="flex items-center justify-center">
          <div className="w-14 h-[1px] bg-light-gray opacity-20"></div>
        </div>

        <ul className="grid grid-cols-4 max-sm:grid-cols-2">
          {categories.map((item) => (
            <li
              key={item.category_id}
              className="max-sm:flex max-sm:items-center max-sm:justify-center"
            >
              <CustomLink
                className="text-sm underline text-white flex items-center"
                href={`/${item.slug}`}
              >
                {item.category_name}
              </CustomLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between flex-wrap gap-y-3.5">
          <div>
            <h2 className="font-semibold text-xl text-secondary">
              Glacier Treks & Adventure
            </h2>
          </div>
          <ul className="flex items-center gap-3">
            {FOOTERSOCIALLINKS.map((item, index) => (
              <li key={index}>
                <Link
                  aria-label={item.title}
                  href={item.link}
                  className="block p-2 rounded-full border text-white hover:bg-secondary hover:text-primary transition-all duration-300"
                >
                  <item.icon />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-light-gray opacity-20"></div>
        <div className="flex items-center justify-between flex-wrap gap-3 text-xs text-gray-500 max-sm:justify-center max-sm:pb-10">
          <span>© 2025 Glacier Treks & Adventure All Rights Reserved.</span>
          <span>
            Digital Partner{" "}
            <Link
              className="underline"
              href={"https://ommdigitalsolution.com/"}
            >
              OMM Digital Soluction Pvt.Ltd
            </Link>
          </span>
        </div>
      </section>
    </footer>
  );
}
