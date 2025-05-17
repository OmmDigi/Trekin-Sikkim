"use client";

import { useQuery } from "@tanstack/react-query";
import { checkLogIn } from "./api/auth";
import { IResponse } from "@/types";
import { Loader2, ShieldOff } from "lucide-react";
import { AxiosError } from "axios";
import { Label } from "@/components/ui/label";
import CustomLink from "@/components/CustomLink";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: IProps) {
  const pathname = usePathname();
  const { error, isFetching } = useQuery<IResponse, AxiosError<IResponse>>({
    queryKey: ["is-login", pathname],
    queryFn: checkLogIn,
  });

  if (isFetching)
    return (
      <div className="w-full h-screen flex items-center gap-3 justify-center">
        <Loader2 className="animate-spin" />
        <Label>Checking Authority..</Label>
      </div>
    );

  if (error?.status === 401 && pathname !== "/auth/login" && pathname !== "/auth/forgot-password")
    return (
      <div className="w-full h-screen flex items-center gap-3 flex-col justify-center">
        <ShieldOff size={25} />
        <Label>Unauthorize</Label>
        <CustomLink href={"/auth/login"}>
          <Button>Please Login</Button>
        </CustomLink>
      </div>
    );

  return <>{children}</>;
}

export default AuthProvider;
