"use client";

import { setVisibility } from "@/redux/slices/mobileNav.slice";
import { RootState } from "@/redux/store";
import { IoMenuOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  children: React.ReactNode;
}

export default function MobileNavSlider({ children }: IProps) {
  const isOpen = useSelector((state: RootState) => state.mobileNavSlice);
  const dispatch = useDispatch();

  return (
    <div className="group/sidebar z-[100]">
      <IoMenuOutline
        onClick={() => dispatch(setVisibility(true))}
        className="hidden max-sm:block active:ring-1 group-focus/sidebar:text-white"
        size={24}
      />
      <aside
        onClick={() => dispatch(setVisibility(false))}
        className={`hidden max-sm:flex fixed bg-[#0004] inset-0 min-h-screen w-full justify-end ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`h-full shadow-2xl w-[80%] overflow-y-scroll bg-accent ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-all duration-300 py-4`}
        >
          <div className="size-full max-w-[80%] mx-auto">
            <div className="w-full flex items-center justify-end">
              <MdClose
                onClick={() => dispatch(setVisibility(false))}
                size={28}
                className="active:ring-1"
              />
            </div>

            {children}
          </div>
        </div>
      </aside>
    </div>
  );
}
