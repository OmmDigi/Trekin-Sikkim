"use client";

import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useTransition } from "react";
import { toast } from "react-toastify";

interface IProps {
  children: React.ReactNode;
}

interface LogoutContextType {
  isPrograssing: boolean;
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

function Logout({ children }: IProps) {
  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  const handleLogout = () => {
    if (isPending) return;

    if (!confirm("Are you sure you want to logout ?")) return;

    startTransition(async () => {
      try {
        const { data } = await api.get<IResponse>("/api/v1/users/logout");
        toast.success(data.message);
        startTransition(() => {
          route.push("/auth/login");
        });
      } catch (error) {
        const err = error as AxiosError<IResponse>;
        toast.error(err.response?.data.message);
      }
    });
  };
  
  return (
    <LogoutContext.Provider value={{ isPrograssing: isPending }}>
      <span
        onClick={handleLogout}
        aria-disabled={isPending}
        className={cn(isPending ? "opacity-55" : "")}
      >
        {children}
      </span>
    </LogoutContext.Provider>
  );
}

export const useLogout = () => {
  const context = useContext(LogoutContext);
  if (!context) {
    throw new Error("useLogout must be used within a Logout component");
  }
  return context;
};

export default Logout;
