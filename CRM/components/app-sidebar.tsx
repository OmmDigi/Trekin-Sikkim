"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects"
// import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  // SidebarHeader,
  // SidebarMenu,
  // SidebarMenuButton,
  // SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SIDEBAR_DATA } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { ISidebarAccount } from "@/features/auth/types";
import { AxiosError } from "axios";
import { IResponse } from "@/types";
import { getSidebarAccountDetails } from "@/features/auth/api/auth";
import { Loader2 } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isFetching, error } = useQuery<
    IResponse<ISidebarAccount>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-account"],
    queryFn: getSidebarAccountDetails,
  });

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={SIDEBAR_DATA.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {isFetching ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin" size={15} />
          </div>
        ) : data?.data ? (
          <NavUser user={data.data} />
        ) : (
          <p className="text-center">No User Found</p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
