"use client";

import { usePathname, useSearchParams } from "next/navigation";
import CheckBox from "../Utils/CheckBox";
import { useTransition } from "react";
import SpinnerSvg from "../SpinnerSvg";

interface IProps {
  date_id: number;
}

export default function AvilableDateCheckbox({ date_id }: IProps) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  // const route = useRouter();
  const pathname = usePathname();

  const checked = searchParams.get("date_id") == date_id.toString();

  return isPending ? (
    <SpinnerSvg size="18px" />
  ) : (
    <CheckBox
      radioGroup="package_date"
      key={date_id}
      onChange={() => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (checked) {
          newSearchParams.delete("date_id");
        } else {
          newSearchParams.set("date_id", date_id.toString());
        }

        startTransition(() => {
          window.location.href = `${pathname}?${newSearchParams.toString()}`;
          //   route.push(`${pathname}?${newSearchParams.toString()}`, {
          //     scroll: false,
          //   });
        });
      }}
      checkBoxColor="#007C00"
      checkIconColor="#fff"
      checked={checked}
    />
  );
}
