import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";

export default function LoadingLayout({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "w-full flex items-center gap-3 justify-center",
        className
      )}
    >
      <Loader2 className="animate-spin" size={18}/>
      <Label>Loading...</Label>
    </div>
  );
}
