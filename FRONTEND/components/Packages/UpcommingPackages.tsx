import api from "@/lib/axios";
import { IPackageListInfo, IResponse } from "@/types";
// import { childVariant, fadeUpVarient, parentVariant } from "@/utils/animations";
// import * as motion from "motion/react-client";
import PackageItem from "../PackageItem";
// import dynamic from "next/dynamic";

// const Mul = dynamic(() => import("motion/react-client").then(mod => mod.ul));
// const Mli = dynamic(() => import("motion/react-client").then(mod => mod.li));
// const Mh2 = dynamic(() => import("motion/react-client").then(mod => mod.h2));
// const Mh3 = dynamic(() => import("motion/react-client").then(mod => mod.h3));

export default async function UpcommingPackages() {
  const { data } = await api.get<IResponse<IPackageListInfo[]>>(
    "/api/v1/upcoming"
  );

  if (data.data.length === 0) return null;

  return (
    <>
      <div className="h-10 max-sm:h-7" />
      <section className="wrapper space-y-10 font-primary">
        <div className="grid grid-cols-2 max-sm:grid-cols-1">
          <div className="space-y-1.5">
            <h2
              // variants={fadeUpVarient(0.05)}
              // initial="hidden"
              // whileInView="visible"
              // viewport={{ once: true }}
              className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2"
            >
              Our Upcoming Trek
            </h2>
            <h3
              // variants={fadeUpVarient(0.06)}
              // initial="hidden"
              // whileInView="visible"
              // viewport={{ once: true }}
              className="text-sm text-accent-2"
            >
              Explore Our Upcoming Treks
            </h3>
          </div>
        </div>

        <ul
          // variants={parentVariant}
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-4 gap-10 w-full max-sm:grid-cols-1"
        >
          {data.data.map((item) => (
            <li
              key={item.id}
              // variants={childVariant}
            >
              <PackageItem singlePackageInfo={item} fromWhere="normal" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
