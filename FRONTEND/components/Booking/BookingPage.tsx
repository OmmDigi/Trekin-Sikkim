"use client";

import AddonForm from "@/components/Booking/AddonForm";
import OrderSummerySection from "@/components/Booking/OrderSummerySection";
import ParticipantsInfoForm from "@/components/Booking/ParticipantsInfoForm";
import Payments from "@/components/Booking/Payments";
import PersonalInfoForm from "@/components/Booking/PersonalInfoForm";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { IBooking, IResponse } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BOOKING_STEPS = [
  {
    id: "personal-info",
    label: "Personal Info",
  },
  {
    id: "participants-info",
    label: "Participants Info",
  },
  // {
  //   id: "addon-info",
  //   label: "Add-on Info",
  // },
  {
    id: "payment",
    label: "Payment",
  },
];

// interface IProps {
//   searchParams: Promise<any>;
// }

export default function BookingPage() {
  const searchParams = useSearchParams();

  const step = searchParams.get("step");
  const packageId = searchParams.get("package_id");
  const dateId = searchParams.get("date_id");

  const addonIds: string[] = [];

  searchParams.forEach((value, key) => {
    if (key.includes("ad")) {
      addonIds.push(key.replace("ad", ""));
    }
  });

  const [bookingInfo, setBookingInfo] = useState<IBooking | null>(null);

  useEffect(() => {
    const getBookingInfo = async () => {
      const urlSearchParams = new URLSearchParams();
      if (packageId) {
        urlSearchParams.set("package_id", packageId);
      }
      if (dateId) {
        urlSearchParams.set("date_id", dateId);
      }
      if (addonIds.length !== 0) {
        urlSearchParams.set("additional_ids", addonIds.join(","));
      }
      const { data: bookingInfo } = await api.get<IResponse<IBooking>>(
        `/api/v1/booking?${urlSearchParams.toString()}`
      );
      setBookingInfo(bookingInfo.data);
    };

    getBookingInfo();
  }, []);

  return (
    <main className="mt-20">
      <div className="wrapper font-primary py-10 space-y-6">
        <h2 className="text-center text-xl text-[#272E3A] font-semibold">
          Booking Details For{" "}
          <span className="underline">
            {bookingInfo?.packageInfo.package_name}
          </span>
        </h2>

        {/* Booking Steps */}
        <section className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
          {/* Left Side */}
          <div className="col-span-2 space-y-5.5 max-sm:col-span-1 max-sm:order-2">
            <ul className="flex items-center flex-wrap gap-11 gap-y-5">
              {BOOKING_STEPS.map((item, index) => (
                <li key={item.id}>
                  <button
                    className={cn(
                      "w-full flex-1 rounded-[10px] flex items-center gap-2.5"
                      // step === item.id ||
                      //   (!step && index === 0)
                      //   ? "bg-accent text-white"
                      //   : "border-accent border text-[#272E3A]"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex items-center justify-center bg-white size-7 rounded-[50%] text-xs",
                        "text-[#272E3A]",
                        step === item.id || (!step && index === 0)
                          ? "bg-accent text-white"
                          : ""
                      )}
                    >
                      {index + 1}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {!step || step === "personal-info" ? (
              <PersonalInfoForm serverBookingInfo={bookingInfo} />
            ) : step === "participants-info" ? (
              <ParticipantsInfoForm />
            ) : step === "addon-info" ? (
              <AddonForm />
            ) : (
              <Payments />
            )}
          </div>

          {/* Right Side */}
          <OrderSummerySection bookingInfo={bookingInfo} />
        </section>
      </div>
    </main>
  );
}
