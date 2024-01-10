"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { Listbox, ListboxItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdBookmark,
  MdDashboard,
  MdHotel,
  MdPeople,
  MdReviews,
} from "react-icons/md";

const SideBarLinks: { title: string; href: string; icon?: React.ReactNode }[] =
  [
    {
      title: "Dashboard",
      href: "/",
      icon: <MdDashboard size={25} />,
    },
    {
      title: "Rooms",
      href: "/rooms",
      icon: <MdHotel size={25} />,
    },
    {
      title: "Reservations",
      href: "/reservations",
      icon: <MdBookmark size={25} />,
    },
    {
      title: "Customers",
      href: "/customers",
      icon: <MdPeople size={25} />,
    },
    {
      title: "Reviews",
      href: "/reviews",
      icon: <MdReviews size={25} />,
    },
  ];
const Sidebar = () => {
  const { isOpen } = useSidebarContext();
  const pathName = usePathname();
  return (
    <section
      className={`py-6 ${
        isOpen
          ? `min-h-screen w-[300px] overflow-y-auto px-3 bg-bg-light dark:bg-bg-dark transition-all duration-500`
          : "w-0 min-h-screen overflow-hidden transition-all duration-500"
      }`}
    >
      <Listbox aria-label="Actions">
        {SideBarLinks.map((link) => (
          <ListboxItem
            aria-label="menu-item"
            as={Link}
            href={link.href}
            key={link.title}
            endContent={link.icon}
            className={`text-text mt-2 ${
              pathName === link.href &&
              `bg-gray-300 text-black dark:text-text dark:bg-bg-light`
            }`}
          >
            {" "}
            {link.title}{" "}
          </ListboxItem>
        ))}
      </Listbox>
    </section>
  );
};

export default Sidebar;
