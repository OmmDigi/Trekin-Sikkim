import { cn } from "@/lib/utils";
import React from "react";

interface IProps extends React.ComponentProps<"input"> {
  label?: string;
  errorMsg?: string;
  labelCss?: string;
}

function Input(props: IProps) {
  return (
    <div className="*:block space-y-1.5">
      {props.label ? (
        <label
          className={cn(
            "font-[600] text-sm",
            props.errorMsg ? "text-red-500" : "",
            props.labelCss
          )}
        >
          {props.label}
        </label>
      ) : null}
      <input
        {...props}
        className={cn(
          "border border-gray-400 text-sm p-2.5 px-4 w-full rounded-md",
          props.className,
          props.errorMsg ? "border-red-500 outline-red-500" : "outline-accent"
        )}
      />
      {props.errorMsg ? (
        <span className="text-sm text-red-500">{props.errorMsg}</span>
      ) : null}
    </div>
  );
}

Input.displayName = "Input";

export default Input;
