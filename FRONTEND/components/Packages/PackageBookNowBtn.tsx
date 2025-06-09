"use client";

import Button from "../Button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  package_id: number;
  className?: string;
  children?: React.ReactNode;
}

export default function PackageBookNowBtn({
  package_id,
  className,
  children,
}: IProps) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  return (
    <>
      <div className="space-y-2 max-sm:w-full max-sm:flex max-sm:flex-col-reverse">
        <Button
          onClick={() => {
            const newUrlSearchParams = new URLSearchParams(searchParams);
            newUrlSearchParams.delete("month");
            newUrlSearchParams.set("package_id", package_id.toString());

            startTransition(() => {
              route.push("/booking?" + newUrlSearchParams.toString());
            });
          }}
          loading={isPending}
          className={cn(
            "!bg-red-500 !text-white font-primary !font-medium min-w-[20rem] !shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] max-sm:min-w-full",
            className
          )}
        >
          Book Now
          {children}
        </Button>
      </div>
    </>
  );
}
