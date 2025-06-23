"use client";

import React from "react";
import "@/app/rich-text-content.css"

interface IProps extends React.ComponentProps<"div"> {
  html: string;
}

export default function ViewFromHtml({ html, ...props }: IProps) {
  return <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: html }} {...props}></div>;
}
