"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/constant";

interface IProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  href: string;
  icon?: React.ReactNode;
}

function LinkButton({ href, icon, ...props }: IProps) {
  const [isLoading, startTransition] = useTransition();
  const route = useRouter();
  return (
    <Button
      {...props}
      disabled = {isLoading}
      onClick={() => {
        startTransition(() => {
          route.push(href);
        });
      }}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : icon}
      {props.children}
    </Button>
  );
}

export default LinkButton;
