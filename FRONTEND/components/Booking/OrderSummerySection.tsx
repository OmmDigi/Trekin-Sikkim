import { cn } from "@/lib/utils";
import { IBooking } from "@/types";
import React, { useEffect, useState } from "react";
import { formatDateToReadable } from "../Utils/formatDateToReadable";
import { CalendarCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface IProps {
  bookingInfo: IBooking | null;
}

export default function OrderSummerySection({ bookingInfo }: IProps) {
  const [prices, setPrices] = useState({
    packageOfferPrice: 0,
    packageOrignalPrice: 0,
    totalPackageOriginalPrice: 0,
    totalPackageOfferPrice: 0,
    addOnPrice: 0,
    gst: 0,
    totalOriginalPriceToPay: 0,
    totalOfferPriceToPay: 0,
  });

  const bookingState = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    const prevPrices = { ...prices };
    const numOfPeople = bookingState.personal_info.number_of_people;
    prevPrices.addOnPrice = parseInt(
      bookingInfo?.additionalInfo?.total_addon_price_inr || "0"
    );
    prevPrices.packageOrignalPrice = parseInt(
      bookingInfo?.packageInfo.original_price_inr || "0"
    );
    prevPrices.packageOfferPrice = parseInt(
      bookingInfo?.packageInfo.offer_price_inr || "0"
    );
    prevPrices.totalPackageOfferPrice =
      prevPrices.packageOfferPrice * numOfPeople;

    prevPrices.gst =
      (5 / 100) * (prevPrices.totalPackageOfferPrice + prevPrices.addOnPrice);

    prevPrices.totalOriginalPriceToPay =
      prevPrices.packageOrignalPrice * numOfPeople +
      prevPrices.addOnPrice +
      prevPrices.gst;

    prevPrices.totalOfferPriceToPay =
      prevPrices.totalPackageOfferPrice +
      prevPrices.addOnPrice +
      prevPrices.gst;
    setPrices(prevPrices);
  }, [bookingInfo, bookingState]);

  return (
    <div className="space-y-2.5 max-sm:order-1">
      <div
        className={cn(
          "px-5.5 py-6 w-full flex-1 rounded-[10px] flex items-center justify-center gap-2.5",
          "bg-accent text-white"
        )}
      >
        Order Summary
      </div>

      <div className="space-y-1 bg-light-gray p-5">
        <h2 className="font-semibold text-gray-700 text-lg">
          {bookingInfo?.packageInfo.package_name}
        </h2>
        <div className="flex items-center gap-1.5">
          <CalendarCheck size={15} />
          <span className="text-sm">
            From{" "}
            <span className="underline">
              {formatDateToReadable(bookingInfo?.datesInfo?.from_date || bookingState.personal_info?.from_date || "")}
            </span>{" "}
            To{" "}
            <span className="underline">
              {formatDateToReadable(bookingInfo?.datesInfo?.to_date || bookingState.personal_info.to_date || "")}
            </span>
          </span>
        </div>
        <div className="w-full mx-auto h-[1px] bg-accent opacity-30 mt-5"></div>
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span>No. of participants</span>
            <span>{bookingState.personal_info.number_of_people}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>
              Price (
              <span className="text-sm">
                ₹{prices.packageOfferPrice} x{" "}
                {bookingState.personal_info.number_of_people}
              </span>
              )
            </span>
            <span>₹{prices.totalPackageOfferPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Add-ons</span>
            <span>₹{prices.addOnPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>GST 5%</span>
            <span>₹{prices.gst}</span>
          </div>

          <div className="w-full mx-auto h-[1px] bg-accent opacity-30 mt-5"></div>
          <div className="flex items-center justify-between font-semibold">
            <span>TOTAL</span>
            <span className="space-x-2.5">
              <span className="line-through text-sm text-red-400">
                ₹{prices.totalOriginalPriceToPay}
              </span>
              <span className="text-green-600">
                ₹{prices.totalOfferPriceToPay}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
