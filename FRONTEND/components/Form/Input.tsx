import React from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  iconBefore?: React.ReactNode;
}

export default function Input(props: IProps) {
  return (
    <div className="w-full space-y-1.5">
      {props.label ? (
        <h2 className="font-semibold text-sm">{props.label}</h2>
      ) : null}
      <div className="bg-white w-full  border border-gray-200 py-2 px-2 overflow-hidden flex items-center gap-2">
        {props.iconBefore ? props.iconBefore : null}
        <input className="text-[0.80rem] outline-none w-full" {...props} />
      </div>
    </div>
  );
}
