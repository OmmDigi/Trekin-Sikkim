"use client";

import dynamic from "next/dynamic";

const BottomNavigation = dynamic(() => import("@/components/BottomNavigation"));

export default function BottomNavWrapper() {
  return <BottomNavigation />;
}
