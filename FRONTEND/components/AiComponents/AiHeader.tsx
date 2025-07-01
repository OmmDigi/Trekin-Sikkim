import React from "react";
import HandleDialogBtn from "../Dialogs/HandleDialogBtn";
import Button from "../Button";
import { Mail, MessageCircleQuestion, Mountain, Phone } from "lucide-react";
import Image from "next/image";
import AiHeaderHolder from "./AiHeaderHolder";
import AiNavItemList from "./AiNavItemList";
import MobileNavSlider from "../MobileNavSlider";
import { NAV_OPTIONS } from "@/constant";
import NavItem from "../NavItem";
import Link from "next/link";

export default function AiHeader() {
  return (
    <>
      <AiHeaderHolder>
        {/* Top Contact Bar */}
        {/* <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 hidden lg:block">
          <div className="wrapper">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>info@glaciertreks.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-100">Follow Us:</span>
                <div className="flex gap-2">
                  
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Header */}
        {/* Logo and Brand Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
          <div className="wrapper py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Logo - Responsive sizing */}
              <Link
                href="/"
                className="flex items-center gap-3 sm:gap-4 flex-1 sm:flex-initial"
              >
                <div className="relative">
                  <Image
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
                    src="/logo.webp"
                    alt="Glacier Treks And Adventure"
                    height={64}
                    width={64}
                    loading="eager"
                    priority={false}
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Mountain
                      size={8}
                      className="text-white sm:w-[10px] sm:h-[10px]"
                    />
                  </div>
                </div>

                {/* Brand Name - Responsive text */}
                <h1 className="flex flex-col min-w-0">
                  <span className="font-montserrat font-bold text-lg sm:text-2xl lg:text-3xl text-gray-800 leading-tight truncate">
                    Glacier Treks
                  </span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="font-montserrat font-semibold text-sm sm:text-lg text-emerald-600 truncate">
                      & Adventure™
                    </span>
                    <div className="hidden sm:block w-px h-4 bg-gray-300 mx-2"></div>
                    <span className="hidden sm:block text-xs text-gray-500 font-medium">
                      Since 2010
                    </span>
                  </div>
                </h1>
              </Link>

              {/* Registration Info - Hidden on mobile and small tablets */}
              {/* <div className="hidden xl:flex flex-col items-center text-center">
                <div className="bg-emerald-100 px-4 py-2 rounded-lg border border-emerald-200">
                  <span className="text-sm font-semibold text-emerald-800 block">
                    Registered & Recognised
                  </span>
                  <span className="text-xs text-emerald-600 block">
                    By Sikkim Tourism
                  </span>
                  <span className="text-xs text-gray-500 block mt-1">
                    Reg No: 14/TD/W/11/TA
                  </span>
                </div>
              </div> */}

              {/* CTA Button - Responsive sizing */}
              <div className="flex-shrink-0 max-sm:hidden">
                <HandleDialogBtn id="enquiry-form" action_type="OPEN">
                  <Button
                    theme="accent"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-1 sm:gap-2"
                  >
                    <MessageCircleQuestion
                      size={16}
                      className="sm:w-[18px] sm:h-[18px]"
                    />
                    <span className="text-sm sm:text-base">
                      <span className="hidden sm:inline">Quick </span>Enquiry
                    </span>
                  </Button>
                </HandleDialogBtn>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden ">
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
                            <p className="text-xs text-emerald-100">
                              & Adventure™
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Contact Info in Sidebar */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          <span>+91 7407248200</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={14} />
                          <span>kiran.yuksom@gmail.com</span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="px-6 py-4 bg-white">
                      <nav>
                        <ul className="space-y-1">
                          {NAV_OPTIONS.map((option, index) => (
                            <NavItem
                              key={option.id}
                              index={index}
                              className="!text-base !text-gray-700 hover:!text-emerald-600 hover:!bg-emerald-50 py-3 px-4 rounded-lg transition-all duration-200 border-b border-gray-200 last:border-b-0 !flex w-full"
                              option={option}
                            />
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
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <React.Suspense
          fallback={
            <p className="text-sm text-center">Loading Navigation items...</p>
          }
        >
          <AiNavItemList />
        </React.Suspense>

        {/* Decorative Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>
      </AiHeaderHolder>
    </>
  );
}
