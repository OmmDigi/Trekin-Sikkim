import Logout from "@/components/Account/Logout";
import LogoutLoader from "@/components/Account/LogoutLoader";
import ProfilePicker from "@/components/Account/ProfilePicker";
import Button from "@/components/Button";
import CustomLink from "@/components/CustomLink";
import MainWrapper from "@/components/MainWrapper";
import PackageItem from "@/components/PackageItem";
import { serverApi } from "@/lib/serverApi";
import { cn } from "@/lib/utils";
import { IAccountInfo, IResponse } from "@/types";
import { AxiosError } from "axios";
import { LogOut, Mail, MapPinHouse, Phone } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const TABS = [{ id: "1", name: "Booked Packages", tab: "packages" }];

interface IProps {
  searchParams: Promise<{
    tab: string;
  }>;
}

export default async function page({ searchParams }: IProps) {
  const api = await serverApi();
  let serverData: IResponse<IAccountInfo> | null = null;
  try {
    const { data } = await api.get<IResponse<IAccountInfo>>(
      "/api/v1/users/account"
    );
    serverData = data;
  } catch (error) {
    const err = error as AxiosError<IResponse>;
    if (err.status === 401) redirect("/auth/login");
    throw new Error(err.response?.data.message);
  }

  if (serverData === null)
    throw new Error("Profile info getting null from server");

  const currentTab = (await searchParams).tab;

  return (
    <MainWrapper className="wrapper pb-7">
      <div className="h-60 w-full aspect-[3/1] bg-gray-200 rounded-2xl max-sm:hidden overflow-hidden"></div>

      <div className="flex items-start gap-6 pl-3.5 max-sm:flex-col max-sm:gap-y-0">
        <div className="size-36 -translate-y-14 max-sm:size-[6.1rem] max-sm:translate-y-0">
          <ProfilePicker defaultImage={serverData.data.profile_image} />
        </div>
        <div className="pt-3.5 relative w-full space-y-2">
          <h2 className="font-semibold font-primary text-2xl max-sm:text-3xl text-accent-2">
            {serverData.data.user_name}
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={`mailto:${serverData.data.user_email}`}
              className="text-base text-gray-600 flex items-center gap-1.5"
            >
              <Mail size={15} />
              {serverData.data.user_email}
            </Link>
            <div className="w-[1px] h-[15px] bg-gray-400"></div>
            <h3 className="text-base text-gray-600 flex items-center gap-1.5">
              <Phone size={15} />
              {serverData.data.user_contact_number}
            </h3>
            {serverData.data.address ? (
              <>
                <div className="w-[1px] h-[15px] bg-gray-400"></div>
                <h3 className="text-base text-gray-600 flex items-center gap-1.5">
                  <MapPinHouse size={15} />
                  {serverData.data.address}
                </h3>
              </>
            ) : null}
          </div>

          <div className="absolute right-0 top-3.5 max-sm:-top-20">
            <Logout>
              <Button theme="black" className="space-x-2.5">
                <LogoutLoader size="18" />
                <span>Logout</span>
                <LogOut size={15} />
              </Button>
            </Logout>
          </div>
        </div>
      </div>

      {/* tabs */}
      <ul className="flex items-center gap-6 px-3.5 -translate-y-3.5 max-sm:mt-7">
        {TABS.map((item) => (
          <li key={item.id}>
            <CustomLink
              scroll={false}
              className={cn(
                "font-semibold text-gray-600 pb-1 border-b-2",
                item.tab === currentTab ||
                  (item.tab === "packages" && !currentTab)
                  ? "border-gray-500"
                  : "border-transparent"
              )}
              href={`?tab=${item.tab}`}
            >
              {item.name}
            </CustomLink>
          </li>
        ))}
      </ul>

      {/* My Package List*/}
      <ul className="grid grid-cols-3 gap-9 pt-6 max-sm:grid-cols-1">
        {serverData.data.enrolled_packages.map((packageInfo) => (
          <li key={packageInfo.id}>
            <PackageItem fromWhere="account" singlePackageInfo={packageInfo} />
          </li>
        ))}
      </ul>
    </MainWrapper>
  );
}
