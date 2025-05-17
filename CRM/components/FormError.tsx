import { cn } from "@/lib/utils";
import React from "react";

interface IProps extends React.ComponentProps<"p">{
  message : string | undefined;
}

export default function FormError({ className, message, ...props }: IProps) {
  return (
    <p
      data-slot="form-message"
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {message}
    </p>
  );
}
