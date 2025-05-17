"use client";

import { useTransition } from "react";
import Button from "../Button";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IResponse } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";

export default function Payments() {
  const [isPending, startTransition] = useTransition();

  const localBookingInfo = useSelector((state: RootState) => state.booking);

  const searchParams = useSearchParams();

  const getAdditionlIdsFormSearchParams = () => {
    const additionalIds: string[] = [];
    searchParams.forEach((value, key) => {
      if (key.includes("ad")) {
        additionalIds.push(key.replace("ad", ""));
      }
    });

    return additionalIds;
  };

  const handlePaymentBtnClick = () => {
    startTransition(async () => {
      try {
        const { data } = await api.post<IResponse<string>>(
          "/api/v1/payment/phonepe/create-order",
          {
            full_name: localBookingInfo.personal_info.full_name,
            email: localBookingInfo.personal_info.email,
            contact_number: localBookingInfo.personal_info.contact_number,
            group_type: localBookingInfo.personal_info.group_type,
            number_of_people: localBookingInfo.personal_info.number_of_people,
            departure_date_id: searchParams.get("date_id"),
            package_id: searchParams.get("package_id"),
            currency: "INR",
            addon_ids: getAdditionlIdsFormSearchParams(),
            participant_info: localBookingInfo.participant_info,
          }
        );

        window.open(data.data);
      } catch (error) {
        const err = error as AxiosError<IResponse>;
        toast.error(err.response?.data.message);
      }
    });
  };

  return (
    <div className="size-full min-h-[40rem] pb-10 overflow-hidden">
      <Button
        loading={isPending}
        onClick={handlePaymentBtnClick}
        theme="accent"
      >
        Pay Now
      </Button>
    </div>
  );
}
