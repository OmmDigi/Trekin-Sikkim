"use client";

import { setDialog } from "@/redux/slices/dialog.slice";
import DialogBody from "./DialogBody";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";

function ViewBookedPackageDetails() {
  const dispatch = useDispatch();
  return (
    <DialogBody
      theme="white"
      className="!rounded-md relative !shadow-2xl p-10 font-primary w-[45rem] mt-10 bg-green-100 space-y-6"
    >
      <X
        onClick={() => {
          dispatch(
            setDialog({
              id: "enquiry-form",
              type: "CLOSE",
            })
          );
        }}
        className="absolute right-6 top-6 cursor-pointer active:scale-75"
        size={20}
      />
    </DialogBody>
  );
}

export default ViewBookedPackageDetails;
