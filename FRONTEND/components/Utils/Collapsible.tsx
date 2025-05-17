"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CollapsibleContextType {
  openIndex: number | null;
  toggleItem: (index: number) => void;
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(
  undefined
);

interface CollapsibleProps {
  children: ReactNode;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  className,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <CollapsibleContext.Provider value={{ openIndex, toggleItem }}>
      <ul
        className={cn(
          "flex items-center justify-center flex-col font-primary max-w-[60rem] mx-auto space-y-4",
          className
        )}
      >
        {children}
      </ul>
    </CollapsibleContext.Provider>
  );
};

export const useCollapsible = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      "useCollapsible must be used within a Collapsible component"
    );
  }
  return context;
};
