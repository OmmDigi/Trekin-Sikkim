import React from "react";
import MobileNavSlider from "../MobileNavSlider";
import { NAV_OPTIONS } from "@/constant";
import NavItem from "../NavItem";
import HandleDialogBtn from "../Dialogs/HandleDialogBtn";
import Button from "../Button";
import { MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
import {
  ICategories,
  IResponse,
  NavOptions,
  UpcomingTrekPackage,
} from "@/types";
import api from "@/lib/axios";

export default async function NewHeader() {
  const [categoriesInfo, upcomingPackageInfo] = await Promise.all([
    api.get<IResponse<ICategories[]>>("/api/v1/category"),
    api.get<IResponse<UpcomingTrekPackage[]>>("/api/v1/upcoming"),
  ]);

  const upcomingPackage: NavOptions[] = [];
  const trekHeadings: NavOptions[] = [];
  const tourHeadings: NavOptions[] = [];
  const expeditionHeadings: NavOptions[] = [];

  categoriesInfo.data.data.forEach((item) => {
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

  upcomingPackageInfo.data.data.forEach((item) => {
    upcomingPackage.push({
      id: item.id,
      pathname: `/${item.category_slug}/${item.package_slug}`,
      text: item.package_name,
    });
  });

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
    <>
      <div className="pt-3 bg-[#1dc08473]">
        <div className="wrapper">
          <div className="flex items-center justify-between gap-4">
            <Image
              className="w-16"
              src={"/logo.webp"}
              alt="Glacier Treks And Adventure"
              height={512}
              width={512}
            />
            <div className="flex flex-col items-center w-full">
              <h1 className="font-montserrat font-semibold text-subheading text-center max-sm:text-sm transition-none">
                Glacier Treks And Adventure™
              </h1>
              <span className="text-sm block text-center">
                Registered & Recognised By Sikkim Tourism
              </span>
              <span className="text-xs block text-center">
                (Reg No 14/TD/W/11/TA (Yuksom West Sikkim))
              </span>
            </div>
            <Image
              className="w-16"
              src={"/logo.webp"}
              alt="Glacier Treks And Adventure"
              height={512}
              width={512}
            />
          </div>
        </div>
      </div>
      <div className="z-[100] relative py-2 bg-[#1dc08473]">
        <div className="flex items-center justify-between py-2 wrapper max-sm:flex-row-reverse">
          <div className="hidden max-sm:block">
            <MobileNavSlider>
              <ul className="space-y-4 mt-4">
                {NAV_OPTIONS.map((option, index) => (
                  <NavItem
                    index={index}
                    className="!text-lg !text-white"
                    key={option.id}
                    option={option}
                  />
                ))}
              </ul>
            </MobileNavSlider>
          </div>

          <nav className="max-sm:hidden">
            <ul className="max-sm:hidden flex items-center gap-0 transition-none">
              {NAV_OPTIONS.map((option, index) => (
                <NavItem
                  index={index}
                  key={option.id}
                  option={option}
                  //   className="!text-white"
                />
              ))}
            </ul>
          </nav>

          <HandleDialogBtn id="enquiry-form" action_type="OPEN">
            <Button
              //   theme="white"
              className="flex items-center gap-2 text-black"
            >
              <MessageCircleQuestion size={15} />
              <span>Enquiry</span>
            </Button>
          </HandleDialogBtn>
        </div>
      </div>
    </>
  );
}
