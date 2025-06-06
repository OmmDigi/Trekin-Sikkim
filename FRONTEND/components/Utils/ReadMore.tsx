"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IProps {
  children: React.ReactNode;
  initIsOpen?: boolean;
}

interface IContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ReadMoreContext = createContext<IContext | null>(null);

export default function ReadMore({ children, initIsOpen = false }: IProps) {
  const [isOpen, setIsOpen] = useState(initIsOpen);

  return (
    <ReadMoreContext.Provider
      value={{ isOpen, setIsOpen }}
    >
      {children}
    </ReadMoreContext.Provider>
  );
}

export const useReadmore = () => {
  const context = useContext(ReadMoreContext);
  if (!context) {
    throw new Error("useReadmore must be used within a Readmore component");
  }
  return context;
};
