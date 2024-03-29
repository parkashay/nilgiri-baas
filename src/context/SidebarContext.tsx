"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const SidebarContext = createContext<ContextProps>({
  isOpen: false,
  setIsOpen: () => true,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <SidebarContext.Provider
      value={{ isOpen, setIsOpen }}
    >
        {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
