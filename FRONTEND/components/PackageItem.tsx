import Image from "next/image";
import React from "react";
import Button from "./Button";
import { GoArrowDownLeft } from "react-icons/go";
import { SignalHigh, Timer } from "lucide-react";
import Link from "next/link";
import { IPackageListInfo } from "@/types";
import HandleDialogBtn from "./Dialogs/HandleDialogBtn";
import ViewBookingDetails from "./Dialogs/ViewBookingDetails";
// import HandleDialogBtn from "./Dialogs/HandleDialogBtn";

interface IProps {
  fromWhere: "account" | "normal";
  singlePackageInfo: IPackageListInfo;
}

export default function PackageItem({ fromWhere, singlePackageInfo }: IProps) {
  return (
    <>
      <div className="font-primary card-shdow rounded-[.8rem] overflow-hidden">
        <div className="h-56 overflow-hidden relative rounded-b-[.8rem]">
          <Image
            className="size-full object-cover opacity-100"
            alt={singlePackageInfo.alt_tag}
            src={singlePackageInfo.thumbnail || "/placeholder_background.jpg"}
            height={1200}
            width={1200}
          />
          {/* <div className="absolute inset-0 flex justify-end p-3">
          <button className="size-8 rounded-[50%] flex items-center justify-center bg-white shadow-lg">
            <Heart size={15} />
          </button>
        </div> */}
        </div>
        {/* <Image
        className="size-full object-cover absolute inset-0 opacity-0 group-hover/item:scale-105 group-hover/item:s group-hover/item:opacity-100 transition-all group-hover/item:backdrop-blur-none duration-500"
        alt="Popular Places Of Treking"
        src={option.images[1]}
        height={1200}
        width={1200}
      /> */}
        {/* <div className="absolute inset-0 fade-gradient-bottom"> */}
        {/* <div className="size-full flex flex-col justify-end px-4 py-4 relative gap-y-2">
          <div className="flex items-center flex-wrap gap-y-3 gap-x-2.5 max-sm:gap-y-0">
            <span className="text-white">
              <FaLocationDot size={10} className="float-left mt-2 mr-1" />
              <span className="text-xs leading-0">{option.name}</span>
            </span>
            <span className="text-white">
              <MdOutlineRemoveRedEye
                size={10}
                className="float-left mt-2 mr-1"
              />
              <span className="text-xs leading-0">5.5K</span>
            </span>
          </div>

          <div className="flex items-center gap-x-3.5 w-full justify-center max-sm:flex-col max-sm:gap-y-2.5">
            <TransitionLink href={option.link} className="block w-full">
              <Button className="!flex !py-1.5 !bg-accent w-full items-center gap-2.5 max-sm:text-xs">
                View
                <GoArrowUpRight />
              </Button>
            </TransitionLink>
            <TransitionLink href={option.link} className="block w-full">
              <Button className="!flex !py-1.5 !bg-transparent !border !border-accent !text-secondary w-full items-center gap-2.5 max-sm:text-xs">
                Book
                <GoArrowUpRight />
              </Button>
            </TransitionLink>
          </div>

          <div className="absolute top-2 right-2 space-y-1.5 *:block">
            <span className="font-montserrat font-semibold bg-accent backdrop-blur-lg px-2 py-1 text-xs rounded-full">
              ₹2000
            </span>
            <span className="font-montserrat ml-3.5 bg-primary text-secondary text-[0.70rem] line-through rounded-full">
              ₹15000
            </span>
          </div>
        </div> */}
        {/* </div> */}
        <div className="p-3 space-y-2">
          <div>
            <h2 className="font-semibold text-base line-clamp-1">
              {singlePackageInfo.package_name}
            </h2>

            <p className="line-clamp-2 text-[12px]">
              {singlePackageInfo.short_description}
            </p>
          </div>
          {/* <div className="h-[1px] w-full bg-slate-200"></div> */}
          <div className="flex items-start gap-2.5 flex-col">
            {/* <button className="text-[12px] rounded-full  font-semibold px-2 py-[3px]">
            4 Days 3 Nights
          </button>
          <button className="text-[12px] bg-accent rounded-full text-white font-semibold px-2 py-[3px]">
            4.5 Ratings
          </button> */}
            <span className="bg-emerald-100 flex items-center gap-1 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
              <Timer size={12} className="mb-[0.13rem]" />
              <span>{singlePackageInfo.duration}</span>
            </span>
            <span className="bg-emerald-100 flex items-center gap-1 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
              <SignalHigh size={11} className="mb-[0.13rem]" />
              <span>{singlePackageInfo.highest_altitude}</span>
            </span>
          </div>
          {/* <div className="h-[1px] w-full bg-slate-200"></div> */}
          {/* <div className="space-y-1 space-x-2">
          <span className="text-red-600 line-through">₹15000</span>
          <span>₹10000</span>
        </div> */}

          <div className="h-1 w-full"></div>
          {fromWhere === "normal" ? (
            <Link
              href={`/${singlePackageInfo.category_slug}/${singlePackageInfo.package_slug}`}
              className="w-full"
            >
              <Button
                className="w-full !bg-red-500 text-xl font-semibold"
                theme="black"
              >
                View & Book
                <GoArrowDownLeft className="rotate-180 ml-1.5" />
              </Button>
              {/* <button className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
            View & Book →
          </button> */}
            </Link>
          ) : (
            <>
              <ViewBookingDetails packageId={singlePackageInfo.id} />
              <HandleDialogBtn id="view-booking-info" action_type="OPEN">
                <Button
                  className="w-full !bg-red-500 text-xl font-semibold"
                  theme="black"
                >
                  View Booking Info
                  <GoArrowDownLeft className="rotate-180 ml-1.5" />
                </Button>
              </HandleDialogBtn>
            </>
          )}
          {/* <div className="flex items-center justify-between">
          <Button className="!bg-transparent border border-black">
            View Now
            <GoArrowDownLeft className="rotate-180 ml-1.5" />
          </Button>
          <Button theme="black">Book Now</Button>
        </div> */}
        </div>
      </div>
    </>
  );
}
