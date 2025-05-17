"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface IProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  spinnerSize?: number;
}

export default function CustomLink({
  href,
  children,
  spinnerSize,
  className,
  ...rest
}: IProps) {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLinkClick = () => {
    startTransition(() => {
      route.push(href.toString());
    });
  };

  return (
    <Link
      href={href}
      {...rest}
      className={cn(className, "flex items-center gap-2")}
      onClick={handleLinkClick}
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={spinnerSize ?? 15} />
      ) : null}
      {children}
    </Link>
  );
}
