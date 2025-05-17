"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CheckBox from "../Utils/CheckBox";
import { useTransition } from "react";
import SpinnerSvg from "../SpinnerSvg";

interface IProps {
  additional_id: number;
  index: number;
}

export default function AdditionalCheckbox({ additional_id, index }: IProps) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const route = useRouter();
  const pathname = usePathname();

  return (
    // <CustomLink href={"/?"}>
    isPending ? (
      <SpinnerSvg size="20px" />
    ) : (
      <CheckBox
        onChange={() => {
          const newSearchParams = new URLSearchParams(searchParams);
          if (newSearchParams.has(`ad${additional_id}`)) {
            newSearchParams.delete(`ad${additional_id}`);
          } else {
            newSearchParams.set(`ad${additional_id}`, index.toString());
          }
          startTransition(() => {
            route.push(`${pathname}?${newSearchParams.toString()}`, {
              scroll: false,
            });
          });
        }}
        checkBoxColor="#007C00"
        checkIconColor="#fff"
        checked={searchParams.has(`ad${additional_id}`)}
      />
    )

    // </CustomLink>
  );
}
