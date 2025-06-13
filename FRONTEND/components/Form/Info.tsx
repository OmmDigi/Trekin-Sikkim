import React from "react";

interface IProps {
  label?: string;
  iconbefore?: React.ReactNode;
  text: string;
}

export default function Info(props: IProps) {
  return (
    <div className="inline-block space-y-1">
      {props.label ? (
        <h2 className="font-semibold text-sm">{props.label}</h2>
      ) : null}
      <div className="w-full overflow-hidden">
        {props.iconbefore ? <span className="float-left mt-1 mr-2">{props.iconbefore}</span> : null}
        {/* <input className="text-[0.80rem] outline-none w-full" {...props} /> */}
        <span className="text-sm">{props.text}</span>
      </div>
    </div>
  );
}
