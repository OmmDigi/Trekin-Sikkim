import api from "@/lib/axios";
import { IPackageListInfo, IResponse } from "@/types";
import PackageItem from "../PackageItem";

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
            <h2 className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2">
              Our Upcoming Trek
            </h2>
            <h3 className="text-sm text-accent-2">
              Explore Our Upcoming Treks
            </h3>
          </div>
        </div>

        <ul className="grid grid-cols-4 gap-10 w-full max-sm:grid-cols-1">
          {data.data.map((item) => (
            <li key={item.id}>
              <PackageItem singlePackageInfo={item} fromWhere="normal" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
