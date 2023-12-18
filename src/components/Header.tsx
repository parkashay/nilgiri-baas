"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import Profile from "./Profile";
import ThemeSwitch from "./atoms/ThemeSwitch";
import Link from "next/link";

const Header = () => {
  const { isOpen, setIsOpen } = useSidebarContext();
  const handleSidebarOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="bg-bg-light dark:bg-bg-dark py-3">
      <div className="flex justify-between mx-3 lg:mx-12 items-center">
        <div className="flex  gap-3">
          <button
            onClick={handleSidebarOpen}
            className="text-text hover:bg-primary rounded-lg px-2 "
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
          <h1 className="text-text">Guest-House</h1>
        </div>
        <div className="flex gap-6 items-center">
          <Profile />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Header;
