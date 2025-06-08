import React from "react";
import HandleDialogBtn from "../Dialogs/HandleDialogBtn";
import Button from "../Button";
import { MessageCircleQuestion, Mountain } from "lucide-react";
import Image from "next/image";
import AiHeaderHolder from "./AiHeaderHolder";
import AiNavItemList from "./AiNavItemList";

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
              <div className="flex items-center gap-3 sm:gap-4 flex-1 sm:flex-initial">
                <div className="relative">
                  <Image
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
                    src="/logo.webp"
                    alt="Glacier Treks And Adventure"
                    height={64}
                    width={64}
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
              </div>

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
              <div className="flex-shrink-0">
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
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <React.Suspense fallback={<p className="text-sm text-center">Loading Navigation items...</p>}>
          <AiNavItemList />
        </React.Suspense>

        {/* Decorative Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>
      </AiHeaderHolder>
    </>
  );
}
