import Image from "next/image";
import React from "react";
import { Pencil, SignalHigh, Star, Timer, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { IPackageList } from "@/features/package/schemaAndTypes";
import CustomLink from "../CustomLink";
import { ButtonLoading } from "../ui/button-loading";

interface IProps {
  packageItem: IPackageList;
  onDeleteBtnClick?: () => void;
  isDeleting?: boolean;
}

export default function PackageItem({
  packageItem,
  onDeleteBtnClick,
  isDeleting,
}: IProps) {
  return (
    <div className="font-primary card-shdow rounded-[.8rem] overflow-hidden">
      <div className="h-56 overflow-hidden relative rounded-b-[.8rem]">
        <Image
          className="size-full object-cover opacity-100"
          alt="Popular Places Of Treking"
          src={packageItem.thumbnail || "/placeholder-image.jpg"}
          height={1200}
          width={1200}
        />
      </div>
      <div className="p-3 space-y-2">
        <div>
          <h2 className="font-semibold text-base line-clamp-2">
            {packageItem.package_name}
          </h2>

          <p className="line-clamp-2 text-[12px]">
            {packageItem.short_description}
          </p>
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          <span className="bg-emerald-100 flex items-center gap-1 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
            <Timer size={12} className="mb-[0.13rem]" />
            <span>{packageItem.duration}</span>
          </span>
          <span className="bg-emerald-100 flex items-center gap-1 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
            <SignalHigh size={11} className="mb-[0.13rem]" />
            <span>{packageItem.highest_altitude}</span>
          </span>
        </div>

        <div className="h-1 w-full"></div>

        <div className="flex items-center justify-between">
          <ButtonLoading
            onClick={onDeleteBtnClick}
            loading={isDeleting}
            variant="destructive"
          >
            <Trash />
            Delete
          </ButtonLoading>

          <Button>
            <CustomLink
              className="flex items-center gap-3"
              href={`/dashboard/packages/${packageItem.id}`}
            >
              <Pencil />
              Edit
            </CustomLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
