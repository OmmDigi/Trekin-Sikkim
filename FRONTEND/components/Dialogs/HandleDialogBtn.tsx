"use client";

import { setDialog } from "@/redux/slices/dialog.slice";
import { TDialogAction, TDialogID } from "@/types";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useDispatch } from "react-redux";

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  id: TDialogID;
  action_type: TDialogAction;
  extraValue?: any;
  handleClose?: () => void;
  handleOpen?: () => void;
}

export default function HandleDialogBtn({
  children,
  id,
  action_type,
  extraValue,
  handleClose,
  handleOpen,
  ...props
}: IProps) {
  const dispath = useDispatch();

  return (
    <span
      {...props}
      onClick={() => {
        dispath(setDialog({ id, type: action_type, extraValue }));
        if (action_type === "CLOSE") {
          handleClose?.();
        } else {
          handleOpen?.();
        }
      }}
    >
      {children}
    </span>
  );
}
