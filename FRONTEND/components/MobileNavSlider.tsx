"use client";

import { cn } from "@/lib/utils";
import { setVisibility } from "@/redux/slices/mobileNav.slice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  children: React.ReactNode;
}

export default function MobileNavSlider({ children }: IProps) {
  const isOpen = useSelector((state: RootState) => state.mobileNavSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen])

  return (
    <div className="group/sidebar z-[100]">
      <IoMenuOutline
        onClick={() => dispatch(setVisibility(true))}
        className="hidden max-sm:block active:ring-1 group-focus/sidebar:text-white"
        size={30}
      />
      <aside
        onClick={() => dispatch(setVisibility(false))}
        className={cn(
          "hidden max-sm:flex bg-[#0004] fixed inset-0 min-h-screen max-h-screen overflow-y-auto justify-end",
          isOpen ? "visible" : "invisible"
        )}
      >
        <div
          className={cn(
            "h-full shadow-2xl w-[80%] overflow-y-scroll bg-accent",
            isOpen ? "translate-x-0" : "translate-x-full",
            "transition-all duration-300"
          )}
        >
          <div className="size-full mx-auto relative">
            {/* <div className="w-full absolute flex items-center justify-end">
              <MdClose
                onClick={() => dispatch(setVisibility(false))}
                size={28}
                className="active:ring-1"
              />
            </div> */}

            <MdClose
              onClick={() => dispatch(setVisibility(false))}
              size={25}
              className="active:ring-1 absolute top-3.5 right-3.5 text-white"
            />

            {children}
          </div>
        </div>
      </aside>
    </div>
  );
}
