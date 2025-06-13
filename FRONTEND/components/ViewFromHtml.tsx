"use client";

import React from "react";

interface IProps extends React.ComponentProps<"div"> {
  html: string;
}

export default function ViewFromHtml({ html, ...props }: IProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} {...props}></div>;
}
