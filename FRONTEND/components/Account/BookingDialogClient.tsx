"use client";

import { useState } from "react";
import { GoArrowDownLeft } from "react-icons/go";
import ViewBookingDetails from "../Dialogs/ViewBookingDetails";
import Button from "../Button";
import HandleDialogBtn from "../Dialogs/HandleDialogBtn";

interface IProps {
  packageId: number;
}

export default function BookingDialogClient({ packageId }: IProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {isDialogOpen ? (
        <ViewBookingDetails
          onClose={() => setIsDialogOpen(false)}
          packageId={packageId}
        />
      ) : null}

      <HandleDialogBtn
        handleOpen={() => setIsDialogOpen(true)}
        id="view-booking-info"
        action_type="OPEN"
      >
        <Button
          className="w-full !bg-red-500 text-xl font-semibold text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          View Booking Info
          <GoArrowDownLeft className="rotate-180 ml-1.5" />
        </Button>
      </HandleDialogBtn>
    </>
  );
}
