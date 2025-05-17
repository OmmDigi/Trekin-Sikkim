"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import SpinnerSvg from "../SpinnerSvg";

interface IProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  checkBoxColor?: string;
  checkIconColor?: string;
  label?: string;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  loading?: boolean;
}

export default function CheckBox({
  checkBoxColor,
  checkIconColor,
  label,
  checked,
  onCheckChange,
  loading = false,
  ...props
}: IProps) {
  const [isChecked, setIsChecked] = useState(checked || false);

  return (
    <label
      {...props}
      className={cn(
        "inline-flex items-center group cursor-pointer space-x-1.5",
        props.className
      )}
    >
      {loading ? (
        <SpinnerSvg size="18px" />
      ) : (
        <input
          onChange={(e) => {
            setIsChecked(e.currentTarget.checked);
            onCheckChange?.(e.currentTarget.checked);
          }}
          type="checkbox"
          className="appearance-none peer"
          checked={isChecked}
        />
      )}

      {loading ? null : (
        <div
          style={{
            borderColor: isChecked ? checkBoxColor : "gray",
            backgroundColor: isChecked ? checkBoxColor : "transparent",
          }}
          className="w-4 h-4 border rounded-sm border-gray-400 flex items-center justify-center transition-colors"
        >
          <svg
            style={{
              color: isChecked ? checkIconColor : "white",
            }}
            className="w-3 h-3 opacity-100 peer-checked:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}

      {label ? <span>{label}</span> : null}
    </label>
  );
}
