"use client";

import { TransitionLink } from "@/components/Utils/TransitionLink";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoMdCall } from "react-icons/io";
import { TbCategory, TbTrekking } from "react-icons/tb";


const OPTIONS = [
  {
    icon: <GoHome size={20} />,
    text: "Home",
    pathname: "/",
  },
  {
    icon: <TbTrekking size={20} />,
    text: "Trek Packages",
    pathname: "/trekking",
  },
  {
    icon: <FaWhatsapp size={20} />,
    text: "Whatsapp",
    pathname: "https://api.whatsapp.com/send?phone=7407248200",
  },
  {
    icon: <IoMdCall size={20} />,
    text: "Call Us",
    pathname: "tel:7407248200",
  },
];

function BottomNavigation() {
  const pathname = usePathname();

  const [bottomNavigationList, setBottomNavigationList] = useState(OPTIONS);

  const [isShowExtraOptions, setIsShowExtraOptions] = useState(false);

  const parentRef = useOutsideClick<HTMLDivElement>(() =>
    setIsShowExtraOptions(false)
  );

  useEffect(() => {
    if (pathname.includes("packages/")) {
      const temp = [...bottomNavigationList];
      temp[1] = {
        icon: <TbCategory size={20} />,
        pathname: "#",
        text: "Overview",
      };
      setBottomNavigationList(temp);
    } else {
      setBottomNavigationList(OPTIONS);
    }
  }, [pathname]);

  return pathname === "/auth/login" || pathname === "/auth/signup" ? null : (
    <div
      ref={parentRef}
      className="hidden font-primary max-sm:grid fixed grid-cols-4 bottom-0 left-0 right-0 h-16 bg-[#fff] shadow-[0px_-4px_6px_0px_rgba(0,_0,_0,_0.1)] z-[99] backdrop-blur-lg"
    >
      {bottomNavigationList.map((item) => (
        <TransitionLink
          handleClick={() => {
            if (item.text === "Overview") {
              setIsShowExtraOptions(!isShowExtraOptions);
            }
          }}
          key={item.pathname}
          href={item.pathname}
          className={`flex items-center flex-col gap-1 justify-center text-primary ${
            pathname === item.pathname ? "bg-light-gray" : ""
          } relative`}
        >
          {item.text === "Overview" && isShowExtraOptions ? (
            <X size={20} />
          ) : (
            item.icon
          )}

          <span className="text-[0.60rem]">{item.text}</span>

          {item.text === "Overview" && isShowExtraOptions ? (
            <div className="fixed bottom-20 bg-accent left-16 rounded-xl transition-all duration-500">
              <div className="relative">
                <ul
                  onClick={() => setIsShowExtraOptions(false)}
                  className="*:p-4 text-white relative z-20"
                >
                  <li>
                    <Link href={"#package-dates"}>Package Dates</Link>
                  </li>
                  <li>
                    <Link href={"#Overview"}>Package Overview</Link>
                  </li>
                  <li>
                    <Link href={"#TripItinerary"}>Trip Itinerary</Link>
                  </li>
                  <li>
                    <Link href={"#faq"}>Faq</Link>
                  </li>
                  <li className="z-20">
                    <Link href={"#photo-gallery"}>Photo Gallery</Link>
                  </li>
                </ul>

                <div className="bg-accent size-10 absolute -bottom-2 left-14 rotate-45 z-10"></div>
              </div>
            </div>
          ) : null}
        </TransitionLink>
      ))}
    </div>
  );
}

export default BottomNavigation;
