import { cn } from "@/lib/utils";
import React from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  errorMsg?: string;
}

export default function TextArea(props: IProps) {
  return (
    <div className="w-full space-y-1.5">
      {props.label ? (
        <label
          className={cn(
            "font-[600] text-sm inline-block",
            props.errorMsg ? "text-red-500" : ""
          )}
        >
          {props.label}
        </label>
      ) : null}
      <div className={cn(
        "bg-transparent w-full border rounded-md text-sm p-2.5 px-4 overflow-hidden flex items-center gap-2",
        props.errorMsg ? "border-red-500" : "border-gray-400",
        "focus-within:ring-1 ring-accent"
      )}>
        <textarea
          {...props}
          className={cn("text-sm w-full outline-none", props.className)}
        ></textarea>
      </div>

      {props.errorMsg ? (
        <span className="text-sm text-red-500">{props.errorMsg}</span>
      ) : null}
    </div>
  );
}
