import { FOOTER_INFO, FOOTERSOCIALLINKS } from "@/constant";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { ICategories, IResponse } from "@/types";
import Link from "next/link";
import CustomLink from "./CustomLink";

export default async function Footer() {
  const { data: categories } = await api.get<IResponse<ICategories[]>>(
    "/api/v1/category"
  );

  return (
    <footer className="w-full bg-primary font-primary text-background py-9 max-sm:text-white max-sm:py-0">
      {/* <section className="space-y-9 wrapper max-sm:max-w-[90%]">
        <ul className="grid grid-cols-4 gap-10 max-sm:grid-cols-1">
          <li className="space-y-4">
            <h2 className="font-semibold text-2xl text-secondary">Category</h2>

            <div className="w-14 h-[1px] bg-light-gray opacity-20"></div>

            <ul className="space-y-4">
              {[1, 2, 3, 4].map((item, index) => (
                <li key={index}>
                  <Link className="text-sm text-secondary block" href={"#"}>
                    Trekking in sikkim
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </section> */}

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
                  <Link
                    key={index}
                    className="text-sm text-secondary block"
                    href={cItem.pathname ?? "#"}
                  >
                    {cItem.icon ? (
                      <span className="float-left mr-2 mt-[1px]">
                        {cItem.icon}
                      </span>
                    ) : null}

                    <span>{cItem.text}</span>
                  </Link>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="space-y-4">
          <h2 className="font-semibold text-2xl text-secondary text-center max-sm:text-left">
            Category
          </h2>
          <ul className="flex items-center gap-6 flex-wrap justify-center max-sm:justify-start">
            {categories.data.map((item) => (
              <li key={item.category_id}>
                <CustomLink
                  className="text-sm text-gray-300 block"
                  href={`/${item.slug}`}
                >
                  {item.category_name}
                </CustomLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-14 h-[1px] bg-light-gray opacity-20"></div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-secondary">
              TrekInSikkim.
            </h1>
          </div>
          <ul className="flex items-center gap-3">
            {FOOTERSOCIALLINKS.map((item, index) => (
              <li key={index}>
                <Link
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
          <span>© 2025 TripTrap. All Rights Reserved.</span>
          <span>
            Digital Partner{" "}
            <Link href={"https://ommdigitalsolution.com/"}>
              OMM Digital Soluction Pvt.Ltd
            </Link>
          </span>
        </div>
      </section>
    </footer>
  );
}
