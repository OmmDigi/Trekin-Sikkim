import Image from "next/image";
import React from "react";
import Button from "./Button";
import { GoArrowDownLeft } from "react-icons/go";
import { SignalHigh, Timer } from "lucide-react";
import Link from "next/link";
import { IPackageListInfo } from "@/types";
import BookingDialogClient from "./Account/BookingDialogClient";

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
            alt={singlePackageInfo.alt_tag ?? singlePackageInfo.package_name}
            src={singlePackageInfo.thumbnail || "/placeholder_background.jpg"}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
        <div className="p-3 space-y-2">
          <div>
            <h2 className="font-semibold text-base line-clamp-1">
              {singlePackageInfo.package_name}
            </h2>

            <p className="line-clamp-2 text-[12px]">
              {singlePackageInfo.short_description}
            </p>
          </div>
          <div className="flex items-start gap-2.5 flex-col">
            <span
              aria-hidden="true"
              className="bg-[#FFFFFF] border border-[#00422956] text-[#004229] flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
            >
              <Timer size={12} className="mb-[0.13rem]" />
              <span aria-hidden="true">{singlePackageInfo.duration}</span>
            </span>
            <span
              aria-hidden="true"
              className="bg-[#FFFFFF] flex items-center gap-1 text-[#004229] border border-[#00422956] text-xs font-semibold px-3 py-1 rounded-full"
            >
              <SignalHigh size={11} className="mb-[0.13rem]" />
              <span aria-hidden="true">
                {singlePackageInfo.highest_altitude}
              </span>
            </span>
          </div>

          <div className="h-1 w-full"></div>
          {fromWhere === "normal" ? (
            <Link
              href={`/${singlePackageInfo.category_slug}/${singlePackageInfo.package_slug}`}
              className="w-full"
            >
              <Button
                className="w-full !bg-red-500 font-semibold"
                theme="black"
              >
                View & Book
                <GoArrowDownLeft className="rotate-180 ml-1.5" />
              </Button>
            </Link>
          ) : (
            <>
              <BookingDialogClient packageId={singlePackageInfo.id} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
