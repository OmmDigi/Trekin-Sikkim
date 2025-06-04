import { childVariant, fadeUpVarient, parentVariant } from "@/utils/animations";
import * as motion from "motion/react-client";
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
          <motion.h2
            variants={fadeUpVarient(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2"
          >
            Our Affordable Packages
          </motion.h2>
          <motion.p
            variants={fadeUpVarient(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-accent-2"
          >
            Explore The Most Popular & Affordable Packages
          </motion.p>
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
        <motion.ul
          key={keyForMotionList}
          variants={parentVariant}
          initial="visible"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
          className="grid grid-cols-4 gap-5 w-full max-sm:grid-cols-1"
        >
          {packageinfo.data.map((packageInfo) => (
            <motion.li
              key={packageInfo.id}
              variants={childVariant}
              // className="w-full h-80 overflow-hidden rounded-[.8rem] relative shadow-2xl group/item max-sm:h-[17rem]"
            >
              <PackageItem fromWhere="normal" singlePackageInfo={packageInfo} />
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* <div className="flex items-center justify-center">
        <Button theme="accent">
          Load More
          <FaCaretDown />
        </Button>
      </div> */}
    </section>
  );
}
