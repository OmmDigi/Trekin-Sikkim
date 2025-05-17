"use client";

import { RootState } from "@/redux/store";
import { TDialogID } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { setDialog } from "@/redux/slices/dialog.slice";
import { cn } from "@/lib/utils";

interface IProps {
  children: React.ReactNode;
  id: TDialogID | null;
  className?: string;
}

export default function DialogWrapper({
  children,
  id: dialogId,
  className,
}: IProps) {
  const { id, type, extraValue } = useSelector((state: RootState) => state.dialogSlice);
  const dispatch = useDispatch();
  return id === dialogId && type === "OPEN" ? (
    ReactDOM.createPortal(
      <dialog
        open
        onClick={() => dispatch(setDialog({ id, type: "CLOSE", extraValue }))}
        className={cn(
          "fixed inset-0 h-full w-full z-[2000] bg-[#0000009d] backdrop-blur-xl",
          className
        )}
      >
        {children}
      </dialog>,
      document.body
    )
  ) : (
    <></>
  );
}
