import Tabs from "../Tabs";
import PackageItem from "../PackageItem";
import api from "@/lib/axios";
import { ICategories, IPackageListInfo, IResponse } from "@/types";
import { randomUUID } from "crypto";

interface IProps {
  searchParams: Promise<{ category: string }>;
}

export default async function OurPackages({ searchParams }: IProps) {
  const currentCateogry: string | undefined = await (
    await searchParams
  ).category;

  const newUrlSearchParams = new URLSearchParams();
  newUrlSearchParams.set("limit", "12");
  if (currentCateogry && currentCateogry !== "all") {
    newUrlSearchParams.set("category_slug", currentCateogry);
  }

  const keyForMotionList = randomUUID();

  const [category, packageinfo] = await Promise.all<
    [IResponse<ICategories[]>, IResponse<IPackageListInfo[]>]
  >([
    (await api.get("/api/v1/category?inhome=true")).data,
    (await api.get("/api/v1/package?" + newUrlSearchParams.toString())).data,
  ]);

  return (
    <section id="our-packages-section" className="wrapper space-y-10">
      <div className="grid grid-cols-2 font-primary max-sm:grid-cols-1">
        <div className="space-y-1.5">
          <h2 className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2">
            Our Affordable Packages
          </h2>
          <h3 className="text-sm text-accent-2">
            Explore The Most Popular & Affordable Packages
          </h3>
        </div>
      </div>

      <Tabs
        scroll={false}
        options={[
          { id: -1, text: "All", slug: "?category=all" },
          ...category.data.map((item) => ({
            id: item.category_id,
            text: item.category_name,
            slug: "?category=" + item.slug,
          })),
        ]}
      />

      {packageinfo.data.length === 0 ? (
        <p className="text-sm text-center text-gray-500">No Package Found</p>
      ) : (
        <ul
          key={keyForMotionList}
          className="grid grid-cols-4 gap-5 w-full max-sm:grid-cols-1"
        >
          {packageinfo.data.map((packageInfo) => (
            <li key={packageInfo.id}>
              <PackageItem fromWhere="normal" singlePackageInfo={packageInfo} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
