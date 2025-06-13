import React from "react";
import { NAV_OPTIONS } from "@/constant";
import NavItem from "../NavItem";
import {
  ICategories,
  IResponse,
  NavOptions,
  UpcomingTrekPackage,
} from "@/types";
import { serverApi } from "@/lib/serverApi";
import { LogIn, UserRound } from "lucide-react";

export default async function AiNavItemList() {
  const api = await serverApi();
  const [categoriesInfo, upcomingPackageInfo, loginInfo] =
    await Promise.allSettled([
      api.get<IResponse<ICategories[]>>("/api/v1/category"),
      api.get<IResponse<UpcomingTrekPackage[]>>("/api/v1/upcoming"),
      api.get<IResponse>("/api/v1/users/is-login"),
    ]);

  const upcomingPackage: NavOptions[] = [];
  const trekHeadings: NavOptions[] = [];
  const tourHeadings: NavOptions[] = [];
  const expeditionHeadings: NavOptions[] = [];

  if (categoriesInfo.status === "fulfilled") {
    categoriesInfo.value.data.data.forEach((item) => {
      if (item.category_type === "Tour") {
        tourHeadings.push({
          id: item.category_id,
          pathname: `/${item.slug}`,
          text: item.category_name,
        });
      } else if (item.category_type === "Trek") {
        trekHeadings.push({
          id: item.category_id,
          pathname: `/${item.slug}`,
          text: item.category_name,
        });
      } else {
        expeditionHeadings.push({
          id: item.category_id,
          pathname: `/${item.slug}`,
          text: item.category_name,
        });
      }
    });
  }

  if (upcomingPackageInfo.status === "fulfilled") {
    upcomingPackageInfo.value.data.data.forEach((item) => {
      upcomingPackage.push({
        id: item.id,
        pathname: `/${item.category_slug}/${item.package_slug}`,
        text: item.package_name,
      });
    });
  }

  if (loginInfo.status === "fulfilled") {
    NAV_OPTIONS[8] = {
      id: 8,
      pathname: "/account",
      text: "Account",
      icon: <UserRound size={15} />,
    };
  } else {
    NAV_OPTIONS[8] = {
      id: 8,
      icon: <LogIn size={14} />,
      text: "Sign In",
      pathname: "/auth/login",
    };
  }

  if (trekHeadings.length !== 0) {
    NAV_OPTIONS[2].submenu = trekHeadings;
  }
  if (tourHeadings.length !== 0) {
    NAV_OPTIONS[3].submenu = tourHeadings;
  }
  if (expeditionHeadings.length !== 0) {
    NAV_OPTIONS[4].submenu = expeditionHeadings;
  }
  if (upcomingPackage.length !== 0) {
    NAV_OPTIONS[1].submenu = upcomingPackage;
  }
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="wrapper">
        <div className="flex items-center justify-between py-3 max-sm:py-0">
          {/* Desktop Navigation */}
          <nav className="hidden lg:block flex-1">
            <ul className="flex items-center justify-center gap-1">
              {NAV_OPTIONS.map((option, index) => (
                <NavItem
                  index={index}
                  key={option.id}
                  option={option}
                  className="text-gray-700 hover:text-emerald-600 font-medium px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all duration-200 relative group"
                />
              ))}
            </ul>
          </nav>

          {/* Mobile Contact Info */}
          <div className="lg:hidden flex items-center gap-2 max-sm:hidden">
            <div className="text-right">
              <div className="text-xs text-gray-500">Call:</div>
              <div className="text-sm font-semibold text-emerald-600">
                +91 9876543210
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
