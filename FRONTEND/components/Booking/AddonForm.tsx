"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "../Button";
import CheckBox from "../Utils/CheckBox";
import { useTransition } from "react";

const ADDON_OPTIONS = [
  {
    addon_item_id: 1,
    addon_item_name: "Addon Item 1",
    addon_item_price: 3000,
  },
  {
    addon_item_id: 2,
    addon_item_name: "Addon Item 2",
    addon_item_price: 4000,
  },
  {
    addon_item_id: 3,
    addon_item_name: "Addon Item 3",
    addon_item_price: 5000,
  },
];

export default function AddonForm() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const [goNextIsPending, startGoNextTransition] = useTransition();

  return (
    <div>
      <ul className="flex items-center gap-4 flex-wrap">
        {ADDON_OPTIONS.map((item) => (
          <li key={item.addon_item_id}>
            <CheckBox
              loading={isPending}
              key={item.addon_item_id}
              checkBoxColor="#007C00"
              checkIconColor="#fff"
              label={item.addon_item_name}
              checked={
                searchParams
                  .getAll("addon")
                  .includes(`${item.addon_item_id}`) || false
              }
              className="font-semibold"
              onCheckChange={(isChecked) => {
                startTransition(() => {
                  const urlSearchParams = new URLSearchParams(searchParams);
                  if (isChecked) {
                    urlSearchParams.append("addon", `${item.addon_item_id}`);
                  } else {
                    const allAddons = urlSearchParams.getAll("addon");
                    urlSearchParams.delete("addon");
                    allAddons.forEach((value) => {
                      if (value !== `${item.addon_item_id}`) {
                        urlSearchParams.append("addon", value);
                      }
                    });
                  }
                  route.push(`/booking?${urlSearchParams.toString()}`);
                });
              }}
            />
          </li>
        ))}
      </ul>

      <Button
        onClick={() => {
          startGoNextTransition(() => {
            route.push("/booking?step=payment");
          });
        }}
        type="submit"
        theme="accent"
        className="mt-5"
        loading={goNextIsPending}
      >
        Save & Pay
      </Button>
    </div>
  );
}
