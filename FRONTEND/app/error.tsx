"use client";

import Button from "@/components/Button";
import CustomLink from "@/components/CustomLink";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";

interface IProps {
  error: AxiosError<IResponse>;
}

export default function error({ error }: IProps) {
  const pathname = usePathname();

  return (
    <div className="wrapper py-5 space-y-1.5">
      <h2>Something Went Wrong Try Again</h2>
      <p className="text-gray-500">
        {error.response?.data.message || error.message}
      </p>
      <CustomLink href={pathname}>
        <Button theme="accent">Reload</Button>
      </CustomLink>
    </div>
  );
}
