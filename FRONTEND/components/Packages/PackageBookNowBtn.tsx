"use client";

import Button from "../Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  package_id: number;
}

export default function PackageBookNowBtn({ package_id }: IProps) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  const isDateSelected = searchParams.get("date_id") !== null;

  return (
    <>
      <div className="space-y-2">
        {isDateSelected ? null : (
          <p className="text-center text-sm text-gray-800">
            Choose One Trip Date
          </p>
        )}

        <Button
          onClick={() => {
            if (!isDateSelected) {
              alert("Please Select One Trip Date");
              return;
            }

            const newUrlSearchParams = new URLSearchParams(searchParams);
            newUrlSearchParams.delete("month");
            newUrlSearchParams.set("package_id", package_id.toString());

            startTransition(() => {
              route.push("/booking?" + newUrlSearchParams.toString());
            });
          }}
          loading={isPending}
          className={cn(
            !isDateSelected ? "opacity-20 active:!scale-100" : "",
            "!bg-red-500 !text-white font-primary !font-medium min-w-[20rem] !shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] max-sm:min-w-[10rem]"
          )}
        >
          Book Now
        </Button>
      </div>
    </>
  );
}
