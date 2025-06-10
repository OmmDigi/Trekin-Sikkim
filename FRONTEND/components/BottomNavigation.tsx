"use client";

import { TransitionLink } from "@/components/Utils/TransitionLink";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";
import { setDialog } from "@/redux/slices/dialog.slice";
import { RootState } from "@/redux/store";
import { Blocks, MessageSquareDiff, X } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { TbCategory } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const OPTIONS = [
  {
    icon: <GoHome size={20} />,
    text: "Home",
    pathname: "/",
  },
  {
    icon: <Blocks size={20} />,
    text: "Packages",
    pathname: "#our-packages-section",
  },
  {
    icon: <FaWhatsapp size={20} />,
    text: "Whatsapp",
    pathname: "https://api.whatsapp.com/send?phone=7407248200",
  },
  {
    icon: <MessageSquareDiff size={20} />,
    text: "Enquiry",
    pathname: "#",
  },
];

function BottomNavigation() {
  const pathname = usePathname();
  const params = useParams();

  const dispatch = useDispatch();

  const SHOW_OTHER_OPTIONS = params["page-name"] && params["package-slug"];

  const { options } = useSelector(
    (state: RootState) => state.bottomOtherOptionSlice
  );

  const [bottomNavigationList, setBottomNavigationList] = useState(OPTIONS);

  const [isShowExtraOptions, setIsShowExtraOptions] = useState(false);

  const parentRef = useOutsideClick<HTMLDivElement>(() =>
    setIsShowExtraOptions(false)
  );

  useEffect(() => {
    if (SHOW_OTHER_OPTIONS) {
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
  }, [SHOW_OTHER_OPTIONS]);


  return pathname === "/auth/login" || pathname === "/auth/signup" ? null : (
    <div
      ref={parentRef}
      className="hidden font-primary max-sm:grid fixed grid-cols-4 bottom-0 left-0 right-0 h-16 bg-[#fff] shadow-[0px_-4px_6px_0px_rgba(0,_0,_0,_0.1)] z-[99] backdrop-blur-lg"
    >
      {bottomNavigationList.map((item, index) => (
        <TransitionLink
          key={index}
          handleClick={() => {
            if (item.text === "Overview") {
              setIsShowExtraOptions(!isShowExtraOptions);
            } else if (item.text === "Enquiry") {
              dispatch(setDialog({ id: "enquiry-form", type: "OPEN" }))
            }
          }}
          href={item.pathname}
          className={cn(
            "flex items-center flex-col gap-1 justify-center text-primary",
            pathname === item.pathname ? "bg-light-gray" : "",
            "relative"
          )}
        >
          {item.text === "Overview" && isShowExtraOptions ? (
            <X size={20} />
          ) : (
            item.icon
          )}

          <span className="text-[0.60rem]">{item.text}</span>

          {item.text === "Overview" && isShowExtraOptions ? (
            <div className="fixed bottom-20 shadow-2xl bg-accent left-16 transition-all duration-500 max-h-[50vh] max-w-[80%] overflow-x-hidden overflow-y-auto bottom_nav">
              <div className="relative">
                <ul
                  onClick={() => setIsShowExtraOptions(false)}
                  className="*:p-4 text-white relative z-20"
                >
                  {options.map((item) => (
                    <li key={item.id} className="border-b">
                      <Link title={item.text} href={item.slug || ""}>
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </TransitionLink>
      ))}
    </div>
  );
}

export default BottomNavigation;
