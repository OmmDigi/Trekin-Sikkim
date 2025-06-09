"use client";

import { BOTTOM_NAV_OTHER_OPTIONS } from "@/constant";
import { setOptions } from "@/redux/slices/bottomOtherOption.slice";
import { IOtherOptionsList } from "@/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  options: IOtherOptionsList[];
}

export default function SetupBottomNavOtherOptions({ options }: IProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setOptions({
        options: [
          ...BOTTOM_NAV_OTHER_OPTIONS,
          ...options.map((item) => ({
            id: item.id,
            slug: `#${item.option_name}`,
            text: item.option_name,
          })),
        ],
      })
    );
  }, []);
  return <></>;
}
