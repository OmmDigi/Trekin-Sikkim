import React from "react";
import MobileNavSlider from "../MobileNavSlider";
import Image from "next/image";
import { Mail, MessageCircleQuestion, Phone } from "lucide-react";
import { NAV_OPTIONS } from "@/constant";
import NavItem from "../NavItem";
import HandleDialogBtn from "../Dialogs/HandleDialogBtn";
import Button from "../Button";
import {
  ICategories,
  IResponse,
  NavOptions,
  UpcomingTrekPackage,
} from "@/types";
import { serverApi } from "@/lib/serverApi";

export default async function AiNavItemList() {
  const api = await serverApi();
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
    <div className="bg-white border-b border-gray-100">
      <div className="wrapper">
        <div className="flex items-center justify-between py-3">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <MobileNavSlider>
              {/* Mobile Sidebar Content */}
              <div className="h-full flex flex-col">
                {/* Sidebar Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        className="w-10 h-10 object-contain"
                        src="/logo.webp"
                        alt="Glacier Treks"
                        height={40}
                        width={40}
                      />
                      <div>
                        <h2 className="font-bold text-lg">Glacier Treks</h2>
                        <p className="text-xs text-emerald-100">& Adventure™</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info in Sidebar */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>+91 9876543210</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span>info@glaciertreks.com</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-4 bg-white">
                  <nav>
                    <ul className="space-y-1">
                      {NAV_OPTIONS.map((option, index) => (
                        <li key={option.id}>
                          <NavItem
                            index={index}
                            className="!text-base !text-gray-700 hover:!text-emerald-600 hover:!bg-emerald-50 py-3 px-4 rounded-lg transition-all duration-200 border-b border-gray-200 last:border-b-0 !flex w-full"
                            option={option}
                          />
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                  <div className="text-center">
                    {/* <div className="bg-emerald-100 px-3 py-2 rounded-lg border border-emerald-200 mb-4">
                          <span className="text-xs font-semibold text-emerald-800 block">
                            Registered & Recognised
                          </span>
                          <span className="text-xs text-emerald-600 block">
                            By Sikkim Tourism
                          </span>
                        </div> */}

                    <HandleDialogBtn id="enquiry-form" action_type="OPEN">
                      <Button
                        theme="accent"
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2"
                      >
                        <MessageCircleQuestion size={16} />
                        <span>Quick Enquiry</span>
                      </Button>
                    </HandleDialogBtn>
                  </div>
                </div>
              </div>
            </MobileNavSlider>
          </div>

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
          <div className="lg:hidden flex items-center gap-2">
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
