"use client";

import { CircleX, X } from "lucide-react";
import DialogWrapper from "./DialogWrapper";
import DialogBody from "./DialogBody";
import { useEffect, useState } from "react";
import { IBookingDetails, IResponse } from "@/types";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import HandleDialogBtn from "./HandleDialogBtn";
import Button from "../Button";

// Example icons (you can replace with actual icon components)
const CalendarIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

interface IProps {
  packageId: number;
}

export default function ViewBookingDetails({ packageId }: IProps) {
  const [booking, setBooking] = useState<IBookingDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get<IResponse<IBookingDetails[]>>(
        `/api/v1/booking/list?package_id=${packageId}`
      )
      .then((response) => {
        setBooking(response.data.data[0]);
        setLoading(false);
      })
      .catch((error: AxiosError<IResponse>) => {
        toast.error(error.response?.data.message);
        setLoading(false);
      });
  }, []);
  return (
    <DialogWrapper
      id="view-booking-info"
      className="flex items-center justify-center"
    >
      <DialogBody
        theme="none"
        // className="relative p-10 rounded-2xl shadow-xl !bg-[#DBFCE7]"
      >
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl animate-fade-in overflow-hidden max-h-[90vh] overflow-y-scroll">
            <div className="w-full p-0 font-sans">
              {/* Header */}
              <div className="bg-[#1DC085] p-5 text-center">
                <h1 className="m-0 text-white">Booking Confirmed!</h1>
              </div>

              {/* Main Content */}
              <div className="px-5 py-8">
                {/* Trip Details */}
                <div className="my-5 rounded-lg bg-gray-100 p-5 space-y-4">
                  <h3 className="mt-0 text-[#1DC085]">
                    {booking?.package_name}
                  </h3>
                  <p>
                    <strong>Date:</strong> 12 May, 2025 - 18 May, 2025
                  </p>
                  <p>
                    <strong>Group Type:</strong> {booking?.trip_type}
                  </p>
                  <p>
                    <strong>Number Of Participants:</strong>{" "}
                    {booking?.number_of_person}
                  </p>
                  {booking?.additional_information ? (
                    <p>
                      <strong>Additionals:</strong>{" "}
                      {booking?.additional_information
                        ?.map((item) => item.additional_name)
                        .join(" + ")}
                    </p>
                  ) : null}
                  <p>
                    <strong>Amount Paid:</strong> {booking?.amount}
                  </p>
                  <p>
                    <strong>Order ID:</strong> {booking?.order_id}
                  </p>
                  <p>
                    <strong>Transaction ID:</strong> {booking?.transactionid}
                  </p>
                </div>

                <div className="my-5 rounded-lg bg-gray-100 p-5 space-y-4 overflow-x-auto">
                  {booking?.participant_info ? (
                    <table className="min-w-full text-left">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">PARTICIPANT NAME</th>
                          <th className="px-4 py-2">PARTICIPANT EMAIL</th>
                          <th className="px-4 py-2">PARTICIPANT NUMBER</th>
                        </tr>
                      </thead>
                      <tbody>
                        {booking?.participant_info.map((participant, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">
                              {participant.participant_name}
                            </td>
                            <td className="px-4 py-2">
                              {participant.participant_email}
                            </td>
                            <td className="px-4 py-2">
                              {participant.participant_number}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}
                </div>
              </div>

              <HandleDialogBtn
                id="view-booking-info"
                action_type="CLOSE"
                className="w-full pb-2.5 px-5 flex items-center justify-end"
              >
                <Button theme="accent">Close</Button>
              </HandleDialogBtn>
            </div>
          </div>
        </div>
      </DialogBody>
    </DialogWrapper>
  );
}
